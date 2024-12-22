import { useAboutModel } from "./model";
import { AboutView } from "./view";

const About = () => {
  const model = useAboutModel();

  return <AboutView {...model} />;
};

export default About;
