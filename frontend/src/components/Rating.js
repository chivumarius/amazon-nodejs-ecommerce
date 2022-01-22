// "RATING" OBJECT:
const Rating = {
 
  // "RENDER" METHODE
  render: (props) => {
    
    // IF THERE "IS NO VALUE":
    if (!props.value) {
      return '<div></div>';
    }
    
    // RETURN "BACKTICKS" → "TEMPLATE LITERALS"
    return `
    <div class="rating">
      <span>
        <i class="${
          props.value >= 1
            ? 'fa fa-star'
            : props.value >= 0.5
            ? 'fa fa-star-half-o'
            : 'fa fa-star-o'
        }">
        </i>
      </span>  
      
      <span>
        <i class="${
          props.value >= 2
            ? 'fa fa-star'
            : props.value >= 1.5
            ? 'fa fa-star-half-o'
            : 'fa fa-star-o'
        }">
        </i>
      </span>  
    
      <span>
        <i class="${
          props.value >= 3
            ? 'fa fa-star'
            : props.value >= 2.5
            ? 'fa fa-star-half-o'
            : 'fa fa-star-o'
        }">
        </i>
      </span>  
  
      <span>
        <i class="${
          props.value >= 4
            ? 'fa fa-star'
            : props.value >= 3.5
            ? 'fa fa-star-half-o'
            : 'fa fa-star-o'
        }">
        </i>
      </span> 

      <span>
        <i class="${
              props.value >= 5
                ? 'fa fa-star'
                : props.value >= 4.5
                ? 'fa fa-star-half-o'
                : 'fa fa-star-o'
            }">
        </i>
      </span>  
      
      <span> ${props.text || ''} </span>
    </div>
    `;
  },
};


// EXPORT:
export default Rating;
