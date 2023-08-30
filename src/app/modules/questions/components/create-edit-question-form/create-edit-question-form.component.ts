import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ITest } from '../../../../models/test.model';
import { generateId } from '../../../../utils/generate-id.util';
import { QuestionType, questionTypes } from 'src/app/models/question-types.model';
import { IQuestion } from '../../../../models/question.model';
import { Router } from '@angular/router';

type IQuestionFormGroup = FormGroup<{
  id: FormControl<string | null>,
  title: FormControl<string | null>,
  type: FormControl<QuestionType | null>
  answer: FormControl<string | null>,
  answers: FormArray<IAnswerFormGroup>
}>;

type IAnswerFormGroup = FormGroup<{
  text: FormControl<string | null>,
  isCorrect: FormControl<boolean | null>
}>;

@Component({
  selector: 'app-create-edit-question-form',
  templateUrl: './create-edit-question-form.component.html',
  styleUrls: ['./create-edit-question-form.component.scss']
})
export class CreateEditQuestionFormComponent {
  @Input() set currentTest(value: ITest | null) {
    if (value) {
      this.testForm.setValue({
        title: value.title,
        questions: []
      });

      value.questions.forEach(q => this.testForm.controls.questions.push(
        new FormGroup({
          id: new FormControl(q.id),
          title: new FormControl(q.title),
          type: new FormControl<QuestionType | null>(q.type),
          answer: new FormControl(q.answer),
          answers: new FormArray<IAnswerFormGroup>(
            q.answers.map((a) => new FormGroup({
              text: new FormControl<string | null>(a.text, [Validators.required]),
              isCorrect: new FormControl<boolean | null>(a.isCorrect),
            }))
          )
        }) as IQuestionFormGroup)
      );
    }
  }

  @Output() createTest = new EventEmitter<ITest>();

  constructor(private router: Router) {
  }

  public readonly questionTypes = questionTypes.map(type => ({ type, name: type.split('-').join(' ') }));
  public currentTestValue: ITest | null = null;
  public testForm = new FormGroup({
    title: new FormControl<string | null>('', [Validators.required]),
    questions: new FormArray<IQuestionFormGroup>([])
  });

  public saveTest(): void {
    if (this.testForm.value.questions?.length === 0) {
      alert('Create at least one question.');
      return;
    }

    if (this.testForm.invalid) return;

    const test: ITest = {
      id: this.currentTestValue?.id || generateId(),
      title: this.testForm.value.title as string,
      questions: this.testForm.value.questions as unknown as IQuestion[]
    };

    this.createTest.emit(test);
    this.router.navigate(['form/tests']);
  }

  public selectQuestionType(event: any, questionIndex: number): void {
    const questionType = event.target.value as QuestionType | null;
    switch (questionType) {
      case 'text-question': {
        this.clearFormArray(this.testForm.controls.questions.controls[questionIndex].controls.answers);
        this.testForm.controls.questions.controls[questionIndex].controls.answer.reset();
        break;
      }
      case 'single-answer-question': {

        break;
      }
      case 'multiple-answer-question': {

        break;
      }
      default: {
        this.clearFormArray(this.testForm.controls.questions.controls[questionIndex].controls.answers);
        this.testForm.controls.questions.controls[questionIndex].controls.answer.reset();
      }
    }
  }

  public addQuestion(): void {
    this.testForm.controls.questions.push(new FormGroup({
      id: new FormControl(generateId()),
      title: new FormControl(),
      type: new FormControl<QuestionType | null>(null),
      answer: new FormControl(),
      answers: new FormArray<IAnswerFormGroup>([])
    }) as IQuestionFormGroup);
  }

  public addAnswer(questionIndex: number): void {
    this.testForm.controls.questions.controls[questionIndex].controls.answers.push(
      new FormGroup({
        text: new FormControl<string | null>(null, [Validators.required]),
        isCorrect: new FormControl<boolean | null>(false),
      })
    );
  }

  public onRadioChange(questionIndex: number, radioControlIndex: number) {
    for (let i = 0; i < this.testForm.controls.questions.controls[questionIndex].controls.answers.length; i++) {
      this.testForm.controls.questions.controls[questionIndex].controls.answers.at(i).controls.isCorrect.setValue(false);
    }

    this.testForm.controls.questions.controls[questionIndex].controls.answers.at(radioControlIndex).controls.isCorrect.setValue(true);
  }

  public deleteQuestion(questionIndex: number): void {
    this.testForm.controls.questions.removeAt(questionIndex);
  }

  public deleteAnswer(questionIndex: number, answerIndex: number): void {
    this.testForm.controls.questions.controls[questionIndex].controls.answers.removeAt(answerIndex);

  }

  private clearFormArray(formArray: FormArray): void {
    while (formArray.length > 1) {
      formArray.removeAt(0);
    }

    formArray.at(0)?.reset();
  }
}
