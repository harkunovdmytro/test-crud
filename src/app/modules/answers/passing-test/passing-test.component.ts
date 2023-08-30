import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { QuestionType } from '../../../models/question-types.model';
import { ITestResult } from '../../../models/test-result.model';
import { ITest } from '../../../models/test.model';
import { generateId } from '../../../utils/generate-id.util';
import { IQuestion } from '../../../models/question.model';
import { IQuestionResult } from '../../../models/question-result.model';
import { IQuestionAnswerResult } from '../../../models/question-answer.model';

type TestPassingForm = FormGroup<{
  title: FormControl<string | null>;
  questions: FormArray<IQuestionPassingFormGroup>
}>;

type IQuestionPassingFormGroup = FormGroup<{
  title: FormControl<string | null>;
  type: FormControl<QuestionType | null>;
  answer: FormControl<string | null>;
  answerResult: FormControl<string | null>;
  answers: FormArray<IAnswerResultFormGroup>;
}>;

type IAnswerResultFormGroup = FormGroup<{
  text: FormControl<string | null>,
  isCorrect: FormControl<boolean | null>
  isMarked: FormControl<boolean | null>
}>;

@Component({
  selector: 'app-passing-test',
  templateUrl: './passing-test.component.html',
  styleUrls: ['./passing-test.component.scss']
})
export class PassingTestComponent {
  @Input() set test(value: ITest | null) {
    if (value) {
      this.currentTest = value;

      this.testPassingForm.setValue({
        title: value.title,
        questions: []
      });

      value.questions.forEach(q => this.testPassingForm.controls.questions.push(
        new FormGroup({
          title: new FormControl(q.title),
          type: new FormControl<QuestionType | null>(q.type),
          answer: new FormControl(q.answer),
          answerResult: new FormControl(null),
          answers: new FormArray<IAnswerResultFormGroup>(
            q.answers.map((a) => new FormGroup({
              text: new FormControl<string | null>(a.text, [Validators.required]),
              isCorrect: new FormControl<boolean | null>(a.isCorrect),
              isMarked: new FormControl<boolean | null>(false),
            }))
          )
        }) as IQuestionPassingFormGroup)
      );
    }
  }

  @Output() savePassedTestResult = new EventEmitter<ITestResult>();

  public currentTest!: ITest;
  public testPassingForm: TestPassingForm = new FormGroup({
    title: new FormControl<string | null>(null),
    questions: new FormArray<IQuestionPassingFormGroup>([])
  });

  public saveResult(): void {
    if (this.testPassingForm.invalid) return;

    const testResult: ITestResult = {
      id: this.currentTest.id,
      tryId: generateId(),
      title: this.currentTest.title,
      questions: this.testPassingForm.value.questions?.map((val, index): IQuestionResult => ({
        id: this.currentTest.questions[index].id,
        title: val.title as string,
        type: val.type as QuestionType,
        answerResult: val.answerResult as string,
        answer: val.answer as string,
        answers: val.answers as IQuestionAnswerResult[]
      })) as IQuestionResult[]
    };

    this.savePassedTestResult.emit(testResult);
  }

  public onRadioChange(questionIndex: number, radioControlIndex: number) {
    for (let i = 0; i < this.testPassingForm.controls.questions.controls[questionIndex].controls.answers.length; i++) {
      this.testPassingForm.controls.questions.controls[questionIndex].controls.answers.at(i).controls.isMarked.setValue(false);
    }

    this.testPassingForm.controls.questions.controls[questionIndex].controls.answers.at(radioControlIndex).controls.isMarked.setValue(true);
  }
}
