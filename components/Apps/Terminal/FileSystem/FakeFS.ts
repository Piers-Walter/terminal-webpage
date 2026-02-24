export class Folder {
  name: string;
  parent: Folder | null;
  children: (Folder | File)[] = [];

  constructor({ name, parent }: { name: string, parent: Folder | null }) {
    this.name = name;
    this.parent = parent;
  }

  getPath = (): string => {
    if (this.parent) {
      return `${this.parent.getPath()}/${this.name}`;
    } else {
      return "";
    }
  }

  addChild = ({ child }: { child: Folder | File }) => {
    this.children.push(child);
  }
}

export class File {
  name: string;
  #contents: string = "";
  constructor({ name }: { name: string }) {
    this.name = name;
  }

  getContents = (): string => {
    return this.#contents;
  }

  setContents = ({ contents }: { contents: string }) => {
    this.#contents = contents;
  }

  rename = ({ newName }: { newName: string }) => {
    this.name = newName;
    return this;
  }
}

type FSEventType = 'create' | 'delete' | 'modify' | 'rename'
type FSEventListener = (event: {
  type: FSEventType,
  path: string,
  item?: File | Folder
}) => void

interface FSReturn {
  success: boolean;
  message?: string;
  directory: (Folder | File)[];
  fileHandle?: File;
}

class FakeFS {
  #root: Folder = new Folder({ name: "/", parent: null });
  #listeners: FSEventListener[] = [];

  constructor() {
    this.#root.parent = this.#root
    this.#root.addChild({ child: new Folder({ name: "home", parent: this.#root }) });
    this.#root.addChild({ child: new Folder({ name: "bin", parent: this.#root }) });
    this.#root.addChild({ child: new Folder({ name: "etc", parent: this.#root }) });
    this.#root.addChild({ child: new Folder({ name: "usr", parent: this.#root }) });
    this.#root.addChild({ child: new Folder({ name: "var", parent: this.#root }) });
    this.#root.addChild({ child: new Folder({ name: "tmp", parent: this.#root }) });
    this.#root.addChild({ child: new Folder({ name: "opt", parent: this.#root }) });
    (this.#root.children.filter(entry => entry instanceof Folder && entry.name == "bin")[0] as Folder).addChild({ child: new Folder({ name: "subdir", parent: this.#root.children.filter(entry => entry instanceof Folder && entry.name == "bin")[0] as Folder }) });
  }

  subscribe(listener: FSEventListener) {
    this.#listeners.push(listener);
    return () => {
      const index = this.#listeners.indexOf(listener);
      if (index > -1) this.#listeners.splice(index, 1);
    };
  }

  #emit(event: { type: FSEventType; path: string; item?: File | Folder }) {
    console.log(this.#listeners)
    this.#listeners.forEach(listener => listener(event));
  }

  #traverseToFolder(absolutePath: string): Folder | null {
    // Navigate from root to the target folder
    // Returns null if path doesn't exist
    let traversingFolder = this.#root;
    const splitPath = absolutePath.split("/").filter(Boolean);
    for (const folderName of splitPath) {
      const folderContents = traversingFolder.children;
      const matchingChildren = folderContents.filter(child => child.name === folderName && child instanceof Folder);
      if (matchingChildren.length === 0) return null;
      traversingFolder = matchingChildren[0] as Folder;
    }
    return traversingFolder;
  }

  checkDirExists(absolutePath: string): boolean {
    // Check if directory exists
    const folder = this.#traverseToFolder(absolutePath);
    return folder !== null;
  }

  normalisePath(path: string): string {
    // Ensure path starts with /
    if (!path.startsWith('/')) {
      throw new Error('Path must be absolute');
    }

    // Split path into segments, filter out empty strings
    const segments = path.split('/').filter(Boolean);
    const normalized: string[] = [];

    for (const segment of segments) {
      if (segment === '..') {
        // Go up one level (remove last segment)
        // But never go above root
        if (normalized.length > 0) {
          normalized.pop();
        }
      } else if (segment === '.') {
        // Current directory - skip it
        continue;
      } else {
        // Regular directory name
        normalized.push(segment);
      }
    }

    // Reconstruct path
    return '/' + normalized.join('/');
  }

  resolvePath(basePath: string, relativePath: string): string {
    if (relativePath.startsWith('/')) {
      return this.normalisePath(relativePath);
    }

    // Join paths and normalize
    const combined = basePath + '/' + relativePath;
    return this.normalisePath(combined);
  }


  readDir(absolutePath: string): FSReturn {
    // Read directory and return list of files and folders
    const folder = this.#traverseToFolder(absolutePath);
    if (!folder) return { success: false, message: `Directory "${absolutePath}" not found`, directory: [] };
    // Add . and .. to folder
    const directory = folder.children;
    const simDirectory = directory.concat([new Folder({ name: ".", parent: folder }), new Folder({ name: "..", parent: folder.parent })])
    return { success: true, directory: simDirectory };
  }

  mkDir(absolutePath: string, name: string): FSReturn {
    // Create directory and return success/error message
    const folder = this.#traverseToFolder(absolutePath);
    if (!folder) return { success: false, message: `Directory "${absolutePath}" not found`, directory: [] };
    // Create new folder
    const newFolder = new Folder({ name: name, parent: folder });
    folder.children.push(newFolder);
    this.#emit({ type: 'create', path: absolutePath, item: newFolder });
    return { success: true, message: `Directory "${absolutePath}" created`, directory: folder.children };
  }

  deleteFolder(absolutePath: string): FSReturn {
    // Delete directory and return success/error message
    const folder = this.#traverseToFolder(absolutePath);
    if (!folder) return { success: false, message: `Directory "${absolutePath}" not found`, directory: [] };
    // Remove folder
    const parent = folder.parent;
    if (!parent) return { success: false, message: `Directory "${absolutePath}" not found`, directory: [] };
    const index = parent.children.indexOf(folder);
    if (index === -1) return { success: false, message: `Directory "${absolutePath}" not found`, directory: [] };
    parent.children.splice(index, 1);
    this.#emit({ type: 'delete', path: absolutePath, item: folder });
    return { success: true, message: `Directory "${absolutePath}" deleted`, directory: parent.children };
  }

  getFile(absolutePath: string): FSReturn {
    // Get file and return contents
    const folder = this.#traverseToFolder(absolutePath.split("/").slice(0, -1).join("/"));
    if (!folder) return { success: false, message: `Folder "${absolutePath}" not found`, directory: [] };
    const name = absolutePath.split("/").pop();
    const file = folder.children.find(child => child instanceof File && child.name === name) as File | undefined;
    if (!file) return { success: false, message: `File "${absolutePath}" not found`, directory: [] };
    return { success: true, directory: [], fileHandle: file };
  }

  addFile(absolutePath: string, name: string): FSReturn {
    const folder = this.#traverseToFolder(absolutePath);
    if (!folder) return { success: false, message: `Directory "${absolutePath}" not found`, directory: [] };
    // Create new file
    const newFile = new File({ name: name });
    folder.children.push(newFile);
    this.#emit({ type: 'create', path: absolutePath, item: newFile });
    return { success: true, message: `File "${name}" created`, directory: folder.children, fileHandle: newFile };
  }

  deleteFile(absolutePath: string): FSReturn {
    const folder = this.#traverseToFolder(absolutePath.split("/").slice(0, -1).join("/"));
    if (!folder) return { success: false, message: `Folder "${absolutePath}" not found`, directory: [] };
    const name = absolutePath.split("/").pop();
    const file = folder.children.find(child => child instanceof File && child.name === name) as File | undefined;
    if (!file) return { success: false, message: `File "${absolutePath}" not found`, directory: [] };
    const index = folder.children.indexOf(file);
    if (index === -1) return { success: false, message: `File "${absolutePath}" not found`, directory: [] };
    folder.children.splice(index, 1);
    this.#emit({ type: 'delete', path: absolutePath, item: file });
    return { success: true, message: `File "${absolutePath}" deleted`, directory: folder.children };
  }
}

export default FakeFS;