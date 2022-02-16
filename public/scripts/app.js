// Client facing scripts here
$(document).ready(function() {

  //adds an answer option to question box
  // $( "#addAns" ).on('click', function() {
  //   console.log("Add Answer");
  //   const $answer = answerTextBoxElement();
  //   $('#answerOptions').append($answer);
  //  })

   $( document.body ).on('click', ".addAns", function(event) {
    const thisElement = $(event.target)
    console.log (thisElement);
    console.log("Add Answer");
    const $answer = answerTextBoxElement();
    const parentElement = thisElement.parent();
    $(parentElement, thisElement).prepend($answer);
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
    $('#question-box').after($questionbox);
   })

  //deletes a selected question box off the page
  $( document.body ).on('click', ".deleteQuestion", function(event) {
    const thisElement = $(event.target)
    console.log("Delete Question");
    console.log(thisElement);
    const grandParentElement = thisElement.parent().parent();
    $(grandParentElement, thisElement).remove();
  })


   const answerTextBoxElement = function () {
    let $answer = `
    <div id= "answerOptions" class="col-12">
      <div class="input-group mb-3">
        <button id="delAns" class="btn btn-outline-danger delAns" type="button">
          Delete
        </button>
        <input
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
          <h4 class="mb-3">New Question</h4>
          <form class="needs-validation" novalidate>
            <div class="row g-3">
              <div class="col-12">
                <label for="" class="form-label">Question</label>
                <textarea
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
                  type="text"
                  class="form-control"
                  placeholder="Answer"
                  value=""
                  required
                />
                <div class="invalid-feedback">Answer is required.</div>
              </div>

              <div class="col-12">
                <label for="" class="form-label">Option 1</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Option 1"
                  value=""
                  required
                />
                <div class="invalid-feedback">Option 1 is required.</div>
              </div>
              <div id= "answerOptions" class="col-12">
                <div class="input-group mb-3">
                  <button class="btn btn-outline-danger delAns" type="button">
                    Delete
                  </button>
                  <input
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
            <button id="deleteQuestion" class="btn btn-danger btn-lg deleteQuestion">Delete</button>
          </form>

        </div>
     `
     return $questionbox
   }

});

