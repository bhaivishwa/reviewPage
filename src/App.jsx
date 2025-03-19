import { useReducer, useState } from "react";
import styles from "./App.module.css";

const reviews = [
  {
    title: "Packings",
    image: "th1.jpeg",
    description:
      "Proper packing prevents damage during transit. Premium materials enhance customer satisfaction.",
  },
  {
    title: "Knowledge",
    image: "knowledge.jpg",
    description:
      "Wear your knowledge and stay on time—every thread tells a story of wisdom and style.",
  },
  {
    title: "Products",
    image: "products.webp",
    description:
      "Smart tees for smarter you—express ideas, inspire minds, and make an impact effortlessly.",
  },
  {
    title: "T-shirts",
    image: "tshirts.webp",
    description:
      "Ideas on fabric, wisdom on display—let your T-shirt speak louder than words.",
  },
  {
    title:"On-Time",
    image: "ontime.webp",
    description:
      "Ontime learning, anytime wearing—fuel your curiosity with style that's always on point.",
  },
];

const initialState = { ratings: {}, selectedYesNo: {}, reviewText: "" };

function reducer(state, action) {
  switch (action.type) {
    case "SET_RATING":
      return {
        ...state,
        ratings: {
          ...state.ratings,
          [action.payload.category]: action.payload.rating,
        },
      };
    case "SET_YESNO":
      return {
        ...state,
        selectedYesNo: {
          ...state.selectedYesNo,
          [action.payload.category]: action.payload.value,
        },
      };
    case "SET_REVIEW_TEXT":
      return { ...state, reviewText: action.payload };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [hoverRating, setHoverRating] = useState({});

  const handleSubmit = () => {
    if (Object.keys(state.ratings).length === 0) {
      alert("Please select a rating for each category.");
      return;
    }
    if (!state.reviewText.trim()) {
      alert("Please enter your review before submitting.");
      return;
    }
    alert("Thank you for your feedback!");
    dispatch({ type: "RESET" });
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <img src="shiphit.jpeg" alt="Logo" className={styles.animatedLogo} />
        <h2 style={{ color: "Purple" }}>Review Contents for Our Clients</h2>
      </header>

      <div className={styles.reviewsGrid}>
        {reviews.map((review, index) => (
          <div key={index} className={styles.reviewCard}>
            <img
              src={review.image}
              alt={review.title}
              className={styles.reviewImage}
            />
            <div className={styles.textContent}>
              <h3 style={{color:"purple",}}>{review.title}</h3>
              <p>{review.description}</p>
              <div className={styles.stars}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`${styles.star} ${
                      (hoverRating[review.title] ||
                        state.ratings[review.title]) >= star
                        ? styles.checked
                        : ""
                    }`}
                    tabIndex={0}
                    role="button"
                    aria-label={`Rate ${review.title} ${star} stars`}
                    onClick={() =>
                      dispatch({
                        type: "SET_RATING",
                        payload: { category: review.title, rating: star },
                      })
                    }
                    onMouseEnter={() =>
                      setHoverRating({ ...hoverRating, [review.title]: star })
                    }
                    onMouseLeave={() =>
                      setHoverRating({ ...hoverRating, [review.title]: 0 })
                    }
                  >
                    ★
                  </span>
                ))}
              </div>
              <div className={styles.yesno}>
                <label>
                  <input
                    type="radio"
                    name={review.title}
                    checked={state.selectedYesNo[review.title] === "Yes"}
                    onChange={() =>
                      dispatch({
                        type: "SET_YESNO",
                        payload: { category: review.title, value: "Yes" },
                      })
                    }
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name={review.title}
                    checked={state.selectedYesNo[review.title] === "No"}
                    onChange={() =>
                      dispatch({
                        type: "SET_YESNO",
                        payload: { category: review.title, value: "No" },
                      })
                    }
                  />
                  No
                </label>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.feedbackSection}>
        <img
          src="/feedback.webp"
          alt="Feedback"
          className={styles.feedbackImage}
        />
        <div className={styles.feedbackContainer}>
          <h3 style={{marginBottom:20,}}>Share Your Comments:</h3>
          <textarea
            className={styles.feedbackTextarea}
            placeholder="Write your feedback here..."
            value={state.reviewText}
            onChange={(e) =>
              dispatch({ type: "SET_REVIEW_TEXT", payload: e.target.value })
            }
          />
          <button className={styles.submitReview} onClick={handleSubmit}>
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
