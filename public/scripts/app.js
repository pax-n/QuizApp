// Client facing scripts here
$(document).ready(function() {

  let arrayOfQuestions = 1;

  $("#editQuizForm" ).on('submit', function(event) {
    event.preventDefault();
    console.log("Form.submit", event.target)
    const form = $(event.target);
    const quizID = form.data("quizid");
    console.log(quizID);
    console.log(form.serialize())
    $.ajax({
      url: `/api/quizzes/${quizID}/questions`,
      data: form.serialize(),
      method: 'post',
      success: function(data) {
        console.log("successful form submssion", data)
      }
    });
  })


  //option add another fake answer
  $( document.body ).on('click', ".addAns", function(event) {
    const thisElement = $(event.target)
    console.log("Add Answer");
    const $answer = answerTextBoxElement();
    const auntElement = thisElement.parent().siblings("#answerOptions");
    console.log (auntElement)
    $(auntElement, thisElement).append($answer);
  })

  //deletes selected answer option
  $( document.body ).on('click', ".delAns", function(event) {
    const thisElement = $(event.target)
    console.log (thisElement);
    console.log("Delete Answer");
    const parentElement = thisElement.parent();
    $(parentElement, thisElement).remove();
  })

   //adds a question box to page
  $( "#addQuestion").on('click', function() {
    const $questionbox = questionBoxElement();
    $('#mainframe').append($questionbox);
    arrayOfQuestions++;
    console.log(arrayOfQuestions);
  })

  //deletes a selected question box off the page
  $( document.body ).on('click', ".deleteQuestion", function(event) {
    const thisElement = $(event.target)
    console.log("Delete Question");
    console.log(thisElement);
    const grandParentElement = thisElement.parent().parent();
    $(grandParentElement, thisElement).remove();
    arrayOfQuestions--;
    console.log(arrayOfQuestions);
  })


  const answerTextBoxElement = function () {
    let $answer = `
    <div id= "answerOptions" class="col-12 answerOptions">
      <div class="input-group mb-3">
        <button id="delAns" class="btn btn-outline-danger delAns" type="button">
          Delete
        </button>
        <input
          name="newFakeAns"
          type="text"
          class="form-control"
          placeholder="Option"
        />
      </div>
    </div>
    `
    return $answer;
  }

  const questionBoxElement = function () {
    let $questionbox = `
    <div id="question-box" class="p-5 mb-4 bg-light rounded-3">
            <h4 class="mb-3">Question ${arrayOfQuestions + 1}</h4>
              <div class="row g-3">
                <div class="col-12">
                  <label for="" class="form-label">Question</label>
                  <textarea
                    name="question"
                    type="text"
                    class="form-control"
                    id=""
                    placeholder=""
                    required
                  ></textarea>
                  <div class="invalid-feedback">Question is required</div>
                </div>

                <div class="col-12">
                  <label for="" class="form-label">Answer</label>
                  <input
                    name="realAns"
                    type="text"
                    class="form-control"
                    placeholder="Answer"
                    value=""
                    required
                  />
                  <div class="invalid-feedback">Answer is required.</div>
                </div>
                <div id= "answerOptions" class="col-12 answerOptions">
                  <div class="input-group mb-3">
                    <button class="btn btn-outline-danger delAns" type="button">
                      Delete
                    </button>
                    <input
                      name="newFakeAns"
                      type="text"
                      class="form-control"
                      placeholder="Option"
                    />
                  </div>
                </div>
                <div class="col-12">
                  <a id="addAns" class="btn btn-secondary addAns"> Add Option </a>
                </div>
              </div>
              <hr class="my-4" />
            </div>

          </div>

     `
    return $questionbox
  }

});

