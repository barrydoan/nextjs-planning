import {useRouter} from "next/router";
import EventList from "../../components/events/event-list";
import {Fragment, useEffect, useState} from "react";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/events/error-alert";
import {ampValidation} from "next/dist/build/output";
import {getFilteredEvents} from "../../helpers/api-util";
import useSWR from "swr";

function FilteredEventsPage(props) {
  const [loadedEvents, setLoadedEvents] = useState();

  const router = useRouter();

  const filterData = router.query.slug;
  const { data, error } = useSWR('https://nextjs-planning-default-rtdb.firebaseio.com/events.json');
  useEffect(() => {
    if (data) {
      const events = [];
      for (const key in data) {
        events.push({
          id: key,
          ...data[key]
        })
      }
      setLoadedEvents(events);
    }
  }, [data])

  if (!loadedEvents) {
    return <p className='center'>Loading...</p>
  }

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  let filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate.getFullYear() === numYear && eventDate.getMonth() === numMonth - 1;
  });

  if (props.hasError) {
    return (
      <Fragment>
        <ErrorAlert><p>Invalid filter. Please adjust your value!</p></ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const events = props.events;

  if (!events || events.length === 0) {
    return (
      <Fragment>
        <ErrorAlert><p>No event found for the chosen filter</p></ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const date = new Date(props.date.y, props.date.month - 1);

    return (
      <Fragment>
        <ResultsTitle date={date} />
        <EventList items={filteredEvents} />
      </Fragment>
    );

}

export async function getServerSideProps(context) {
  const {params} = context;

  const filteredDate = params.slug;

  const filteredYear = filteredDate[0];
  const filteredMonth = filteredDate[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth > 12 ||
    numMonth < 1) {
    return {
      props: {hasError: true},
      notFound: true,
    };
  }

  const filteredEvents = await getFilteredEvents({
    year: numYear,
    month: numMonth
  });

  return {
    props: {
      events: filteredEvents,
      date: {
        year: numYear,
        month: numMonth
      }
    }
  }
}

export default FilteredEventsPage;