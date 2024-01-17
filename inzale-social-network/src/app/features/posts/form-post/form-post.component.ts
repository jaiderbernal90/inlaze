import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IPost, PostForm } from '../../../core/interface/IPost.interface';
import { PostService } from '../services/post.service';
import { finalize } from 'rxjs';
import { IResponseData } from '../../../core/interface/IResponse.interface';

@Component({
  selector: 'app-form-post',
  standalone: true,
  imports: [ ReactiveFormsModule ],
  templateUrl: './form-post.component.html',
  styleUrl: './form-post.component.scss'
})
export class FormPostComponent {
  @Input() idUserAuth:number | undefined;
  @Output() reloadData = new EventEmitter<boolean>();
  formPost!:FormGroup<PostForm>
  loading!: boolean;

  constructor(
    private readonly postSvc: PostService
  ) { }

  ngOnInit(): void {
    this.formPost = new FormGroup<PostForm>({
        title: new FormControl('', { nonNullable: true, validators:[Validators.required, Validators.maxLength(255)] }),
        content: new FormControl('', { nonNullable: true, validators:[Validators.required] }),
        likes: new FormControl(0, { nonNullable: true }),
        user_id: new FormControl( this.idUserAuth , { nonNullable: true }),
    });
  }

  onSubmit(): void {
    this.loading = true;
    this.postSvc.create(this.formPost.value).pipe((finalize(() => this.loading = false))).subscribe((res:IResponseData<IPost>) => {
      this.reloadData.emit();
    })
  }
}
