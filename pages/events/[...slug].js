import {useRouter} from "next/router";
import {getFilteredEvents} from "../../dummy-data";
import EventList from "../../components/events/event-list";
import {Fragment} from "react";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/events/error-alert";

function FilteredEventsPage() {
  const router = useRouter();
  const filteredData = router.query.slug;
  console.log(filteredData);
  if (!filteredData) {
    return <p className='center'>Loading...</p>
  }

  const filteredYear = filteredData[0];
  const filteredMonth = filteredData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth > 12 ||
    numMonth < 1) {
    return (
      <Fragment>
        <ErrorAlert><p>Invalid filter. Please adjust your value!</p></ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const filteredEvents = getFilteredEvents({year: numYear, month: numMonth});

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        <ErrorAlert><p>No event found for the chosen filter</p></ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const date = new Date(numYear, numMonth - 1);

    return (
      <Fragment>
        <ResultsTitle date={date} />
        <EventList items={filteredEvents} />
      </Fragment>
    );

}

export default FilteredEventsPage;