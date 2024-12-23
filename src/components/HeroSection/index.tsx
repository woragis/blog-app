import { useHeroSectionModel } from "./model";
import { HeroSectionView } from "./view";

const HeroSection = () => {
  const model = useHeroSectionModel();

  return <HeroSectionView {...model} />;
};

export default HeroSection;
