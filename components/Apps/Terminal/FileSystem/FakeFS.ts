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

interface FSReturn {
  success: boolean;
  message: string;
}

class FakeFS {
  #root: Folder = new Folder({ name: "/", parent: null });
  #currentFolder: Folder = this.#root;

  constructor() {

  }

  changeDir({ newPath }: { newPath: string }): FSReturn {
    if (newPath == "/") {
      this.#currentFolder = this.#root;
      return { success: true, message: "" };
    }
    const absolutePath = this.resolveDir({ path: newPath });

    let traversingFolder = this.#root;
    let splitPath = absolutePath.split("/")
    splitPath = splitPath.slice(1);
    for (const folder of splitPath) {
      const folderContents = traversingFolder.children;
      const matchingChildren = folderContents.filter(child => child.name == folder && child instanceof Folder);
      if (matchingChildren.length == 0) return { success: false, message: `Error: directory ${folder} doesn't exist\n` };
      traversingFolder = matchingChildren[0] as Folder;
    }
    this.#currentFolder = traversingFolder;
    return { success: true, message: "" };
  }

  getCwd(): string {
    return this.#currentFolder.getPath() + "/";
  }

  readDir(): (File | Folder)[] {
    return this.#currentFolder.children;
  }

  #checkDirExists({ path }: { path: string }): boolean {
    const absolutePath = this.resolveDir({ path });
    let traversingFolder = this.#root;
    for (const folder in absolutePath.split("/")) {
      const folderContents = traversingFolder.children;
      const matchingChildren = folderContents.filter(child => child.name == folder && child instanceof Folder);
      if (matchingChildren.length == 0) return false
      traversingFolder = matchingChildren[0] as Folder;
    }
    return true;
  }

  resolveDir({ path }: { path: string }): string {
    if (this.isAbsolute({ path })) return path;
    return this.getCwd() + path
  }

  isAbsolute({ path }: { path: string }): boolean {
    return path[0] == "/"
  }

  mkDir({ folderName }: { folderName: string }): FSReturn {
    if (this.#currentFolder.children.find(child => child.name == folderName)) return { success: false, message: "Folder already exists" };
    const newFolder = new Folder({ name: folderName, parent: this.#currentFolder })
    this.#currentFolder.addChild({ child: newFolder })
    return { success: true, message: "" };
  }

  getFile({ name }: { name: string }): File | null {
    const children = this.#currentFolder.children;
    const fileIndex = children.findIndex(child => (child instanceof File) && child.name == name)
    if (fileIndex > -1) {
      const toReturn = children[fileIndex]
      if (toReturn instanceof File) return toReturn;
    }
    return null;
  }

  addFile({ filename }: { filename: string }): FSReturn {
    if (this.#currentFolder.children.find(child => child.name == filename)) return { success: false, message: "File already exists" };
    const newFile = new File({ name: filename })
    this.#currentFolder.addChild({ child: newFile });
    return { success: true, message: "" };
  }

  deleteFile({ filename }: { filename: string }): FSReturn {
    const children = this.#currentFolder.children;
    const fileIndex = children.findIndex(child => (child instanceof File) && child.name == filename)
    if (fileIndex > -1) {
      children.splice(fileIndex, 1)
      return { success: true, message: "" };
    }
    return { success: false, message: "File doesn't exist" };
  }
}

export default FakeFS;