
import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/events-search";
import {Fragment} from "react";
import {useRouter} from "next/router";
import {getAllEvents, getFeaturedEvents} from "../../helpers/api-util";

function AllEventsPage(props) {
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
  const events = await getAllEvents();
  return {
    props: {
      events: events
    },
    revalidate: 60
  }
}

export default AllEventsPage;