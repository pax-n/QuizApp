// Client facing scripts here
$(document).ready(function() {

  $( document.body ).on('click', ".delAns", function(event) {
    const thisElement = $(event.target)
    console.log (thisElement);
    console.log("Delete Answer");
    const parentElement = thisElement.parent();
    $(parentElement, thisElement).remove();
   })

  $( "#addAns" ).on('click', function() {
    console.log("Add Answer");
    const $answer = answerTextBoxElement();
    $('#answerOptions').append($answer);
   })

  $( "#addQuestion" ).on('click', function() {
    const $questionbox = questionBoxElement();
    $('#question-box').after($questionbox);
   })

  $( "#deleteQuestion" ).on('click', function() {
    console.log("Delete Question");
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
     <h4 class="mb-3">Question 1</h4>
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
         <div class="col-12">
           <a id="addAns" class="btn btn-secondary"> Add Option </a>
         </div>
       </div>
       <hr class="my-4" />
       <button id="deleteQuestion" class="btn btn-danger btn-lg">Delete</button>
     </form>

   </div>

     `
     return $questionbox
   }

});

