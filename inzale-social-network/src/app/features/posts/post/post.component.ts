import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IPost } from '../../../core/interface/IPost.interface';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { ButtonActionsComponent } from '../../../shared/components/button-actions/button-actions.component';
import { IconDeleteComponent } from '../../../shared/components/icon-delete/icon-delete.component';
import { IconEditComponent } from '../../../shared/components/icon-edit/icon-edit.component';
import { PostService } from '../services/post.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { IResponseData } from '../../../core/interface/IResponse.interface';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [ ButtonActionsComponent, IconDeleteComponent, IconEditComponent, TitleCasePipe, DatePipe ],
  providers: [ PostService ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent {

  @Input() post!:IPost;
  @Input() idUserAuth!:number | undefined;
  @Output() reloadData = new EventEmitter<boolean>();

  constructor(
    private readonly _postSvc: PostService,
    private readonly router:Router
  ){}

  public handeEditPost(id:number):void {
    this.router.navigate(['/','post',id])
  }

  public handeDeletePost(id:number):void {
     this._postSvc.delete(id).pipe((finalize(() => this.reloadData.emit() ))).subscribe((res:IResponseData<IPost>) => {});
  }

}
