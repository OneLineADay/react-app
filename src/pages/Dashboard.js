import React, { useEffect } from "react";
import Calendar from "react-calendar";
import { connect } from "react-redux";
import { fetchEntriesRequest } from "redux/entries/entries.actions";
import Navigation from "containers/Navigation";
import Entries from "containers/Entries";
import { StyledBody, StyledContainer } from "pages/DashboardStyles";

const Dashboard = ({ fetchEntries }) => {
  const today = new Date();
  const [date, setDate] = React.useState(today);

  const onDateChange = date => {
    fetchEntries(date);
    setDate(date);
  };

  const setTitle = () => {
    document.title = "One Line A Day";
  };

  useEffect(setTitle, []);

  useEffect(() => {
    fetchEntries(date);
  });

  return (
    <StyledBody>
      <Navigation />
      <StyledContainer>
        <div>
          <Calendar value={date} onChange={onDateChange} />
        </div>

        <Entries />
      </StyledContainer>
    </StyledBody>
  );
};

const mapDispatchToProps = dispatch => ({
  fetchEntries: date => dispatch(fetchEntriesRequest(date))
});

export default connect(
  null,
  mapDispatchToProps
)(Dashboard);
