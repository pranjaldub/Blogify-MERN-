import {
  createStyles,
  Badge,
  Group,
  Title,
  Text,
  Card,
  SimpleGrid,
  Container,
  rem,
} from "@mantine/core";
import {gsap} from "gsap";
import React, {useRef, useEffect, useLayoutEffect} from "react";
import {IconEyeCheck, IconSpyOff, IconBallpen} from "@tabler/icons-react";
import {ReactComponent as AboutSvg} from "../../component/svg/about.svg";
import styles from "./about.module.css";
import {LovingDoodle} from "react-open-doodles";
const mockdata = [
  {
    title: "Our Vision",
    description:
      "We envision a blogging landscape where every word matters, where the impact of your message is amplified by impeccable grammar and flawless writing.",
    icon: IconEyeCheck,
    doodle: <LovingDoodle accent="#ff0083" ink="#484848" />,
  },
  {
    title: "Privacy focused",
    description:
      "At Blogify, we prioritize the protection of your personal information. We employ industry-standard security measures to safeguard your data and ensure its confidentiality.",
    icon: IconSpyOff,
    doodle: <LovingDoodle accent="#ff0083" ink="#484848" />,
  },
  {
    title: "Constant Innovation",
    description:
      "At Blogify, we are committed to staying ahead of the curve. Our dedicated team of researchers and engineers continuously push the boundaries of AI technology. ",
    icon: IconBallpen,
    doodle: <LovingDoodle accent="#ff0083" ink="#484848" />,
  },
];

const useStyles = createStyles((theme) => ({
  title: {
    fontSize: rem(38),
    fontWeight: 750,

    [theme.fn.smallerThan("sm")]: {
      fontSize: rem(24),
    },
  },

  description: {
    maxWidth: 600,

    "&::after": {
      content: '""',
      display: "block",
      backgroundColor: "#7862F2",
      width: rem(45),
      height: rem(2),
      marginTop: theme.spacing.sm,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },

  card: {
    border: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
  },

  cardTitle: {
    "&::after": {
      content: '""',
      display: "block",
      backgroundColor: "#7862F2",
      width: rem(45),
      height: rem(2),
      marginTop: theme.spacing.sm,
    },
  },
}));

export default function About() {
  const {classes, theme} = useStyles();
  function cardAnimationEnter(id) {
    console.log(id);
    gsap.to(`#${id}`, {transform: "translateY(-5%)"});
  }
  function cardAnimationLeave(id) {
    console.log(id);
    gsap.to(`#${id}`, {transform: "translateY(0%)"});
  }
  const features = mockdata.map((feature) => (
    <Card
      key={feature.title}
      id={feature.title[0]}
      shadow="lg"
      radius="md"
      className={`${classes.card} cardComponent`}
      padding="xl"
      onMouseEnter={() => cardAnimationEnter(feature.title[0])}
      onMouseLeave={() => cardAnimationLeave(feature.title[0])}
    >
      <feature.icon size={rem(50)} stroke={2} color="#7862F2" />
      <Text fz="lg" fw={500} className={classes.cardTitle} mt="md">
        {feature.title}
      </Text>
      <Text fz="sm" c="dimmed" mt="sm">
        {feature.description}
      </Text>
    </Card>
  ));
  const ref = useRef();

  useLayoutEffect(() => {
    // create our context. This function is invoked immediately and all GSAP animations and ScrollTriggers created during the execution of this function get recorded so we can revert() them later (cleanup)
    let ctx = gsap.context(() => {
      // Our animations can use selector text like ".box"
      // this will only select '.box' elements that are children of the component
      //gsap.to(".box", {...});
      // or we can use refs
      //gsap.to(ref.current, {rotation: 360});
      gsap.from(".cardComponent", {
        transform: "translateY(100%)",
        stagger: 0.15,
      });
      gsap.to(".cardComponent", {transform: "translateY(0)", stagger: 0.15});
    }, ref); // <- IMPORTANT! Scopes selector text

    return () => ctx.revert(); // cleanup
  }, []);
  return (
    <div style={{position: "relative", overflow: "hidden"}}>
      <AboutSvg style={{position: "absolute", width: "80vw"}} />
      <Container
        size="lg"
        py="xl"
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
        }}
      >
        <Title order={2} className={classes.title} ta="center" mt="sm">
          Enhancing Blogging with AI-Powered Precision
        </Title>
        <div className={styles.descriptionContainer}>
          <Text c="dimmed" className={classes.description} ta="center" mt="md">
            At Blogify, we believe in the power of words to inspire, educate,
            and entertain. Our mission is to revolutionize the world of blogging
            by harnessing the capabilities of artificial intelligence (AI) to
            enhance the quality and grammar of every blog post. With our
            cutting-edge AI technology, we ensure that your content shines with
            precision and professionalism, captivating your readers and
            elevating your online presence.
          </Text>
        </div>
        <SimpleGrid
          cols={3}
          spacing="xl"
          mt={50}
          breakpoints={[{maxWidth: "sm", cols: 1}]}
          ref={ref}
        >
          {features}
        </SimpleGrid>
      </Container>
    </div>
  );
}
