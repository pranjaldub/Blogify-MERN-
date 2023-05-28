import React, {useState, useEffect} from "react";
import classes from "./image.module.css";
import {One, Two, Three, Four, Five} from "./svg/svgarray";
import {AnimatePresence, motion} from "framer-motion";

const Image = () => {
  const one = (
    <AnimatePresence>
      <motion.div
        initial={{scale: 1, x: 0}}
        animate={{scale: 1.2, x: -10, y: -10}}
        transition={{delay: 0.3, ease: "linear"}}
        exit={{scale: 0}}
      >
        <One style={{height: "200px", width: "200px", position: "absolute"}} />
      </motion.div>
    </AnimatePresence>
  );
  const two = (
    <AnimatePresence>
      <motion.div
        initial={{scale: 1, x: 0}}
        animate={{scale: 1, x: 10, y: 10}}
        transition={{delay: 0.3, ease: "linear"}}
        exit={{scale: 0}}
      >
        <Two style={{height: "200px", width: "200px", position: "absolute"}} />
      </motion.div>
    </AnimatePresence>
  );
  const three = (
    <AnimatePresence>
      <motion.div
        initial={{scale: 1, x: 0}}
        animate={{scale: 1.2, x: -10, y: -10}}
        transition={{delay: 0.3, ease: "linear"}}
        exit={{scale: 0}}
      >
        <Three
          style={{height: "200px", width: "200px", position: "absolute"}}
        />
      </motion.div>
    </AnimatePresence>
  );
  const four = (
    <AnimatePresence>
      <motion.div
        initial={{scale: 1, x: 0}}
        animate={{scale: 1, x: 10, y: 10}}
        transition={{delay: 0.3, ease: "linear"}}
        exit={{scale: 0}}
      >
        <Four style={{height: "200px", width: "200px", position: "absolute"}} />
      </motion.div>
    </AnimatePresence>
  );
  const five = (
    <motion.div
      initial={{scale: 1, x: 0}}
      animate={{scale: 1, x: -10, y: -10}}
      transition={{delay: 0.3, ease: "linear"}}
      exit={{scale: 0}}
    >
      <Five style={{height: "200px", width: "200px", position: "absolute"}} />
    </motion.div>
  );
  const [compOne, setCompOne] = useState(one);
  const [compTwo, setCompTwo] = useState(two);
  const [compThree, setCompThree] = useState(three);
  const [compFour, setCompFour] = useState(four);
  const [compFive, setCompFive] = useState(five);

  // const [components, setComponents] = useState(comp);
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }
  let interval;

  useEffect(() => {
    interval = setInterval(() => {
      console.log("timeout");
      const comp = [compOne, compTwo, compThree, compFour, compFive];
      const shuffleArr = shuffle([...comp]);
      // setComponents((prev) => shuffle([...prev]));
      setCompOne(shuffleArr[0]);
      setCompTwo(shuffleArr[1]);
      setCompThree(shuffleArr[2]);
      setCompFour(shuffleArr[3]);
      setCompFive(shuffleArr[4]);
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.one}>{compOne}</div>
      <div className={classes.two}>{compTwo}</div>
      <div className={classes.three}>{compThree}</div>
      <div className={classes.four}>{compFour}</div>
      <div className={classes.five}>{compFive}</div>
    </div>
  );
};

export default Image;
