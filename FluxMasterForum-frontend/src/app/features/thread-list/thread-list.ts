import {ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {Thread} from "../../core/services/thread/thread";
import {ThreadModel} from "../../models/thread.model";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {forkJoin, switchMap} from "rxjs";

@Component({
  selector: 'app-thread-list',
  imports: [],
  templateUrl: './thread-list.html',
  styleUrl: './thread-list.css',
})

export class ThreadList implements OnInit {
  constructor(private route: ActivatedRoute) {}

  protected readonly thread = inject(Thread);
  protected readonly router = inject(Router);
  protected readonly cdr = inject(ChangeDetectorRef);

  threads: ThreadModel[] = [];

  ngOnInit(){
    this.route.queryParamMap.pipe(
      switchMap( (params) =>
        this.thread.getAll(
            (params as ParamMap).get("category_id")? Number((params as ParamMap).get("category_id")) : undefined
        )
      )
    ).subscribe({
      next: (data) => {
        this.threads = data as ThreadModel[];
        this.cdr.detectChanges();
      },
      error: err => alert("An error oc{curred while threads rendering")
    })
  }

  showThreadDetails(id: number) {
    console.log("show thread details activated");
    this.router.navigate([`/threads/${id}`]);
  }
}
