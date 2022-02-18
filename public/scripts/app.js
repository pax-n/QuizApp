// Client facing scripts here
$(document).ready(function () {
  let arrayOfQuestions = 1;

  //option add another fake answer
  $(document.body).on('click', '.addAns', function (event) {
    const thisElement = $(event.target);
    console.log('Add Answer');
    const $answer = answerTextBoxElement();
    const auntElement = thisElement.parent().siblings('#answerOptions');
    console.log(auntElement);
    $(auntElement, thisElement).append($answer);
  });

  //deletes selected answer option
  $(document.body).on('click', '.delAns', function (event) {
    const thisElement = $(event.target);
    console.log(thisElement);
    console.log('Delete Answer');
    const parentElement = thisElement.parent();
    $(parentElement, thisElement).remove();
  });

  //adds a question box to page
  $('#addQuestion').on('click', function () {
    const $questionbox = questionBoxElement();
    $('#mainframe').append($questionbox);
    arrayOfQuestions++;
    console.log(arrayOfQuestions);
  });

  //deletes a selected question box off the page
  $(document.body).on('click', '.deleteQuestion', function (event) {
    const thisElement = $(event.target);
    console.log('Delete Question');
    console.log(thisElement);
    const grandParentElement = thisElement.parent().parent();
    $(grandParentElement, thisElement).remove();
    arrayOfQuestions--;
    console.log(arrayOfQuestions);
  });
  //adds a question box to page
  $('#createQuiz').on('click', function () {
    addFormName();
  });
  const addFormName = function () {
    let i = 1;
    let z = 1;
    $('#question-box textarea[name="question"]').each(function () {
      $(this).attr('name', 'question' + i);
      $('#question-box input[name="answer"]').each(function () {
        $(this).attr('name', 'answer' + i + '-' + z);
        z++;
      });
      i++;
    });
  };
  const answerTextBoxElement = function () {
    let $answer = `
    <div id="answerOptions" class="col-12 answerOptions">
      <div class="input-group mb-3">
        <button class="btn btn-outline-danger delAns" type="button">
          Delete
        </button>
        <input
          type="text"
          class="form-control"
          placeholder="Option"
          name="answer"
        />
      </div>
    </div>
    `;
    return $answer;
  };

  const questionBoxElement = function () {
    let $questionbox = `

    <div id="question-box" class="p-5 mb-4 bg-light rounded-3">
    <h4 class="mb-3">Question ${arrayOfQuestions + 1}</h4>
    <div class="row g-3">
      <div class="col-12">
        <label for="question" class="form-label">Question</label>
        <textarea
          type="text"
          class="form-control"
          id="question"
          name="question"
          placeholder=""
          required
        ></textarea>
        <div class="invalid-feedback">Question is required</div>
      </div>

      <div class="col-12">
        <label for="answer" class="form-label">Answer</label>
        <input
          type="text"
          class="form-control"
          placeholder="Answer"
          id="answer"
          name="answer"
          required
        />
        <div class="invalid-feedback">Answer is required.</div>
      </div>

      <div class="col-12">
        <label for="" class="form-label">Option</label>
        <input
          type="text"
          class="form-control"
          placeholder="Option"
          name="answer"
          required
        />
        <div class="invalid-feedback">Option 1 is required.</div>
      </div>
      <div id="answerOptions" class="col-12 answerOptions">
        <div class="input-group mb-3">
          <button class="btn btn-outline-danger delAns" type="button">
            Delete
          </button>
          <input
            type="text"
            class="form-control"
            placeholder="Option"
            name="answer"
          />
        </div>
      </div>
      <div class="col-12">
        <a id="addAns" class="btn btn-secondary addAns"> Add Option </a>
      </div>
    </div>
    <hr class="my-4" />
            <button id="deleteQuestion" class="btn btn-danger btn-lg deleteQuestion">Delete</button>


        </div>
     `;
    return $questionbox;
  };
});
