import { Component, inject } from '@angular/core';
import {
	FormGroup,
	FormsModule,
	NonNullableFormBuilder,
	ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostModel } from '../../models/post.model';
import { PostService } from '../../services/post.service';
import { HeaderComponent } from '../../shared/components/header/header.component';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, HeaderComponent],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  fb = inject(NonNullableFormBuilder);
  postService = inject(PostService);
  router = inject(Router);
  form: FormGroup;
  edicao: boolean = false;

  post: PostModel = inject(ActivatedRoute).snapshot.data['post'];

  constructor() {
    this.form = this.fb.group({
      title: [''],
      text: [''],
    });

    if (this.post) {
      console.log(this.post);
      this.form.patchValue(this.post);
      this.edicao = true;
    }
  }

  onSubmit() {
    console.log(this.form.value);
  }

  voltar() {
    this.router.navigateByUrl('/home');
  }

  salvar() {
    let value = this.form.getRawValue() as PostModel;
    let data = new Date();
    let dia = data.toLocaleString().slice(0, 2);
    let mes = data.toLocaleString('default', { month: 'long' }).slice(0, 3);
    let ano = data.getFullYear();

    value.data = `${dia} de ${mes}, ${ano}`;

    this.postService.novoPost(value).subscribe({
      complete: () => {
        this.voltar();
      },
    });
  }

  editar() {
    this.postService
      .editarPost(this.post.id!, this.form.getRawValue() as PostModel)
      .subscribe({
        complete: () => {
          this.voltar();
        },
      });
  }
  excluir() {
    this.postService.excluirPost(this.post.id!).subscribe({
      complete: () => {
        this.voltar();
      },
    });
  }
}
