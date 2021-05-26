
import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/events-search";
import {Fragment} from "react";
import {useRouter} from "next/router";
import {getFeaturedEvents} from "../../helpers/api-util";

function AllEventsPage() {
  const events = getAllEvents();
  const router = useRouter();

  function findEventsHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  }

  return <Fragment>
    <EventsSearch onSearch={findEventsHandler} />
    <EventList items={props.events}/>
  </Fragment>
}

export async function getStaticProps(context) {
  const feauturedEvents = await getFeaturedEvents();
  return {
    props: {
      events: feauturedEvents
    }
  }
}

export default AllEventsPage;