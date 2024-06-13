import { useContext, useRef, useState } from "react";
import { motion, useAnimate, stagger } from "framer-motion";
import { ChallengesContext } from "../store/challenges-context.jsx";
import Modal from "./Modal.jsx";
import images from "../assets/images.js";

export default function NewChallenge({ onDone }) {
  const title = useRef();
  const description = useRef();
  const deadline = useRef();
  const [scope, animate] = useAnimate();
  const [selectedImage, setSelectedImage] = useState(null);
  const { addChallenge } = useContext(ChallengesContext);
  const [invalidInput, setInvalidInput] = useState({
    title: false,
    description: false,
    deadline: false,
    image: false,
  });

  function handleSelectImage(image) {
    setSelectedImage(image);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const challenge = {
      title: title.current.value,
      description: description.current.value,
      deadline: deadline.current.value,
      image: selectedImage,
    };

    const invalid = {
      title: !challenge.title.trim(),
      description: !challenge.description.trim(),
      deadline: !challenge.deadline.trim(),
      image: !challenge.image,
    };

    if (
      invalid.title ||
      invalid.description ||
      invalid.deadline ||
      invalid.image
    ) {
      setInvalidInput((prevState) => {
        const states = {
          ...prevState,
          ...invalid,
        };
        return states;
      });

      const invalidElements =
        invalid.title ||
        invalid.description ||
        invalid.deadline ||
        invalid.image
          ? `${invalid.title ? "#title," : ""}${
              invalid.description ? "#description," : ""
            }${invalid.deadline ? "#deadline," : ""}${
              invalid.image ? ".choose-a-image," : ""
            }`.slice(0, -1)
          : null;

      console.log(invalidElements);

      if (invalidElements) {
        animate(
          invalidElements,
          { x: [-10, 0, 10, 0], borderColor: "#d41111" },
          { type: "spring", duration: 0.1, delay: stagger(0.03) }
        );
      }

      return;
    }

    onDone();
    addChallenge(challenge);
  }

  const formValidStyle = (id) =>
    !invalidInput[id] ? { borderColor: "#d9e2f1" } : null;

  return (
    <Modal title="New Challenge" onClose={onDone}>
      <form id="new-challenge" onSubmit={handleSubmit} ref={scope}>
        <p>
          <label id="title" htmlFor="title">
            Title
            {invalidInput.title && <span>&nbsp;&nbsp;cannot be blank!</span>}
          </label>
          <input
            style={formValidStyle("title")}
            ref={title}
            type="text"
            name="title"
            id="title"
          />
        </p>

        <p>
          <label id="description" htmlFor="description">
            Description
            {invalidInput.description && (
              <span>&nbsp;&nbsp;cannot be blank!</span>
            )}
          </label>
          <textarea
            style={formValidStyle("description")}
            ref={description}
            name="description"
            id="description"
          />
        </p>

        <p>
          <label id="deadline" htmlFor="deadline">
            Deadline
            {invalidInput.deadline && <span>&nbsp;&nbsp;cannot be blank!</span>}
          </label>
          <input
            style={formValidStyle("deadline")}
            ref={deadline}
            type="date"
            name="deadline"
            id="deadline"
          />
        </p>

        {invalidInput.image && (
          <p className="choose-a-image">An image must be choosen!</p>
        )}

        <motion.ul
          id="new-challenge-images"
          variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
        >
          {images.map((image) => (
            <motion.li
              variants={{
                hidden: { opacity: 0, scale: 0.5 },
                visible: { opacity: 1, scale: [1] },
              }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              exit={{ opacity: 1, scale: 1 }}
              key={image.alt}
              onClick={() => handleSelectImage(image)}
              className={selectedImage === image ? "selected" : undefined}
            >
              <img {...image} alt={image.alt} />
            </motion.li>
          ))}
        </motion.ul>

        <p className="new-challenge-actions">
          <motion.button
            whileHover={{ backgroundColor: "#d41111", color: "#fff" }}
            type="button"
            onClick={onDone}
          >
            Cancel
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 500 }}
          >
            Add Challenge
          </motion.button>
        </p>
      </form>
    </Modal>
  );
}
