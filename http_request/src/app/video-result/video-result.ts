export class VideoResult {
id: string;
title: string;
description: string;
thumbnailUrl: string;
videoUrl: string;

constructor(obj: any){
  this.id = obj.id;
  this.title = obj.title;
  this.description= obj.description;
  this.thumbnailUrl = obj.thumbnailUrl;
  this.videoUrl = obj.videoUrl
}

}
