import {createStyles, Text, rem} from "@mantine/core";
import {useLayoutEffect, useRef} from "react";
import {gsap} from "gsap";
const useStyles = createStyles((theme) => ({
  root: {
    display: "flex",
    backgroundColor: "#DBE4FF",
    padding: `calc(${theme.spacing.xl} * 1.5)`,
    borderRadius: theme.radius.md,

    [theme.fn.smallerThan("sm")]: {
      flexDirection: "column",
    },
  },

  title: {
    color: "#4263EB",
    textTransform: "uppercase",
    fontWeight: 600,
    fontSize: theme.fontSizes.lg,
  },

  count: {
    color: "#4263EB",
    fontSize: rem(32),
    lineHeight: 1,
    fontWeight: 700,
    marginBottom: theme.spacing.md,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  description: {
    color: theme.black,
    fontSize: theme.fontSizes.sm,
    marginTop: rem(5),
  },

  stat: {
    flex: 1,

    "& + &": {
      paddingLeft: theme.spacing.xl,
      marginLeft: theme.spacing.xl,
      borderLeft: `${rem(1)} solid #4263EB`,

      [theme.fn.smallerThan("sm")]: {
        paddingLeft: 0,
        marginLeft: 0,
        borderLeft: 0,
        paddingTop: theme.spacing.xl,
        marginTop: theme.spacing.xl,
        borderTop: `${rem(1)} solid #4263EB`,
      },
    },
  },
}));

export default function StatsCards({data}) {
  const {classes} = useStyles();
  const ref = useRef();

  //   useLayoutEffect(() => {
  //     // create our context. This function is invoked immediately and all GSAP animations and ScrollTriggers created during the execution of this function get recorded so we can revert() them later (cleanup)
  //     let ctx = gsap.context(() => {
  //       // Our animations can use selector text like ".box"
  //       // this will only select '.box' elements that are children of the component
  //       //gsap.to(".box", {...});
  //       // or we can use refs
  //       //gsap.to(ref.current, {rotation: 360});
  //       gsap.from(`#${}`, {
  //         transform: "translateY(100%)",
  //         stagger: 0.15,
  //       });
  //       gsap.to(".cardComponent", {transform: "translateY(0)", stagger: 0.15});
  //     }, ref); // <- IMPORTANT! Scopes selector text

  //     return () => ctx.revert(); // cleanup
  //   }, []);
  function cardAnimationEnter(id) {
    console.log(id);
    gsap.to(`#${id}`, {transform: "translateY(-5%)"});
  }
  function cardAnimationLeave(id) {
    console.log(id);
    gsap.to(`#${id}`, {transform: "translateY(0%)"});
  }
  const stats = data.map((stat) => (
    <div
      key={stat.title}
      className={classes.stat}
      id={stat.title.split(" ")[1]}
      onMouseEnter={() => {
        cardAnimationEnter(stat.title.split(" ")[1]);
      }}
      onMouseLeave={() => {
        cardAnimationLeave(stat.title.split(" ")[1]);
      }}
    >
      <Text className={classes.count}>{stat.stats}</Text>
      <Text className={classes.title}>{stat.title}</Text>
      <Text className={classes.description}>{stat.description}</Text>
    </div>
  ));
  return (
    <div className={classes.root} ref={ref}>
      {stats}
    </div>
  );
}
