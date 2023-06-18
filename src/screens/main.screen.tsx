import { PerformanceResponse, useGetAllPerformance } from "src/api/performance.api";
import Spinner from "src/fallback-ui/spinner.ui";
// import { HeaderTabs } from "src/components/main.header";
import { HeroHeaderContent } from "src/components/hero.header";
import { Container, Space } from "@mantine/core";
import NewsLetterBanner from "src/components/newsletter.comp";
import PerformanceCarousel from "src/components/performance.carousel";
import FeaturesGrid from "src/components/feature.banner";
import { useMapData } from "src/hooks/useMapData";

function MainScreen() {
  const { data, error, isLoading } = useGetAllPerformance();
  const { mappedData } = useMapData<PerformanceResponse>(data);

  if (isLoading || !data) {
    return <Spinner />
  }

  if (error) {
    console.log('Error: ', error)
  }

  return (
    <>
      <HeroHeaderContent />

      <Container>
        <FeaturesGrid title="One of the easiest portal to see your ticket at a place" description={"Every once in a while, you’ll see a Golbat that’s missing some fangs. This happens when hunger drives it to try biting a Steel-type Pokémon."} />
      </Container>

      <Container>
        <PerformanceCarousel data={mappedData} />
      </Container>

      <Space h="xl" />
      <Space h="xl" />

      <Container>
        <NewsLetterBanner />
      </Container>
    </>
  );
}

export default MainScreen;
