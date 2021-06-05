import { getFeaturedEvents } from "../dummy-data";
import Head from "next/head";
import EventList from "../components/events/event-list";
import NewsletterRegistration from "../components/input/newsletter-registration";

function HomePage() {
  const featuredEvents = getFeaturedEvents();

  return <div>
    <Head>
        <title>Nextjs Event</title>
        <meta name='description' content="Find a lot of events that you want to know"/>
    </Head>
    <NewsletterRegistration />
    <EventList items={featuredEvents}/>
  </div>
}

export default HomePage;