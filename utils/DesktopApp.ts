'use client'
import { ReactNode } from "react";
import { IconType } from "react-icons";

export type sizeLimits = {
  minWidth: number;
  minHeight: number;
  maxWidth?: number;
  maxHeight?: number;
}

export interface DesktopAppDetails {
  name: string,
  icon?: IconType,
  body: ({ sizes }: { sizes?: sizeLimits }) => ReactNode,
  sizes?: sizeLimits;
  kind: "app" | "widget"
}

export default class DesktopApp implements DesktopAppDetails {
  public readonly name: string;
  public readonly icon: IconType | undefined;
  public readonly kind: "app" | "widget";
  public x: number;
  public y: number;
  public uuid: string;
  public body: ({ sizes }: { sizes?: sizeLimits }) => ReactNode;
  public sizes: sizeLimits;
  public minimized: boolean;

  constructor(name: string, icon: IconType | undefined, body: ({ sizes }: { sizes?: sizeLimits }) => ReactNode, sizes?: sizeLimits, kind: "app" | "widget" = "app") {
    this.name = name;
    this.icon = icon
    this.x = 0;
    this.y = 0;
    this.uuid = crypto.randomUUID()
    this.body = body
    this.kind = kind

    this.sizes = sizes || {
      minWidth: 500,
      minHeight: 500
    }
    this.minimized = false;
  }
}