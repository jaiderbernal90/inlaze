import { HttpClientModule } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { IPost } from '../../interface/IPost.interface';
import { IPagination, IParamsPagination } from '../../interface/IResponse.interface';
import { PostComponent } from '../../../features/posts/post/post.component';
import { JwtService } from '../../../shared/services/jwt.service';
import { PostService } from '../../../features/posts/services/post.service';
import { FormPostComponent } from '../../../features/posts/form-post/form-post.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ InfiniteScrollModule, RouterLink, FormsModule, ReactiveFormsModule, HttpClientModule, RouterModule, PostComponent, FormPostComponent ],
  providers: [ PostService ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {

  posts: IPost[] = [];
  pagination!: IPagination;
  private paramsData!: IParamsPagination | null;
  idUserAuth: number | undefined = this._jwtSvc.getIdUserToken();
  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;
  direction = "";

  constructor(
    private readonly _postSvc: PostService,
    private readonly _jwtSvc: JwtService
  ){}

  ngOnInit(): void {
    this.getPosts();
  }

  ngOnDestroy(): void {}

  onScrollDown(){
    this.onChangeData({
      take: (this.paramsData?.take || 10) + 10
    });
  }

  public onChangeData(dataFiltes: IParamsPagination | null): void {
    this.paramsData = dataFiltes;
    this.getPosts();
  }

  private getPosts(): void {
    this._postSvc.findAll(this.paramsData).subscribe(response => {
      const { data, meta } = response;
      this.posts = data;
      this.pagination = meta;
    })
  }


}
