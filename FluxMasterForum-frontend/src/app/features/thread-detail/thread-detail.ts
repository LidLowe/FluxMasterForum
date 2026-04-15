import { Component, inject, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {forkJoin, switchMap} from "rxjs";
import { Thread } from "../../core/services/thread/thread";
import { Post } from "../../core/services/post/post";
import { PostModel } from "../../models/post.model";
import { ThreadModel } from "../../models/thread.model";

@Component({
  selector: 'app-thread-detail',
  imports: [],
  templateUrl: './thread-detail.html',
  styleUrl: './thread-detail.css',
})

export class ThreadDetail implements OnInit {
  constructor(private route: ActivatedRoute) {}

  protected readonly threadService = inject(Thread);
  protected readonly postService = inject(Post);

  thread: ThreadModel | null = null;
  posts: PostModel[] = [];

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap(
        (params: ParamMap) => forkJoin([
          this.threadService.get(Number(params.get("id"))),
          this.postService.get(Number(params.get("id")))
        ])
      )
    ).subscribe({
      next: (data) => {
        this.thread = data[0] as ThreadModel;
        this.posts = data[1] as PostModel[];
      },
      error: err => alert("Произошла ошибка при загрузке постов")
    });
  }
}
