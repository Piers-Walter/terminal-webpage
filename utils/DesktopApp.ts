'use client'
import { ReactNode } from "react";
// import { randomUUID, UUID } from "crypto";
import { IconType } from "react-icons";

export interface DesktopAppDetails {
  name: string,
  icon: IconType,
  body: ()=>ReactNode
}

export default class DesktopApp implements DesktopAppDetails {
  public readonly name: string;
  public readonly icon: IconType;
  public x: number;
  public y: number;
  public uuid: string;
  public body: ()=>ReactNode


  constructor(name: string, icon: IconType, body: ()=>ReactNode) {
    this.name = name;
    this.icon = icon;
    this.x = 0;
    this.y = 0;
    this.uuid = crypto.randomUUID()
    this.body = body
  }
}