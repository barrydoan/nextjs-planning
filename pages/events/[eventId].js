import {Fragment} from "react";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import {getAllEvents, getEventById} from "../../helpers/api-util";

function EventDetailPage(props) {
  const event = props.selectedEvent;
  if (!event) {
    return <p>No event found!</p>
  }

  return (
    <Fragment>
      <EventSummary title={event.title}/>
      <EventLogistics date={event.date}
                      address={event.location}
                      image={event.image}
                      imageAlt={event.title}/>
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
}

export async function getStaticProps(context) {
  const eventId = context.params.eventId;
  const event = await getEventById(eventId);
  return {
    props: {
      selectedEvent: event
    }
  }
}

export async function getStaticPaths() {
  const events = await getAllEvents();
  const paths = events.map(event => ({params: {eventId: event.id}}));

  return {
    paths,
    fallback: false
  };
}

export default EventDetailPage;