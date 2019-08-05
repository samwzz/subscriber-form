import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  FormControl,
  InputLabel,
  FilledInput,
  FormHelperText,
  Select,
  MenuItem,
  Chip,
  Avatar,
  Button,
} from '@material-ui/core';
import { formErrors, noErrors } from '../helpers/validators';
import { subscribe, fetchTeams } from '../api';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  height: auto;
  width: 700px;
  padding: 3rem;
  margin-top: 10%;
  background-color: #2F2C2C;
  border-radius: 0.5rem;
  box-shadow: 0 3px 6px 0 rgba(0,0,0,0.16);
  box-sizing: border-box;

  @media (max-width: 480px) {
    width: 350px;
    padding: 1rem;
    margin-top: 15%;
  }
`;

const StyledFormFields = styled.div`
  width: 100%;
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const StyledFormControl = styled(FormControl)`
  width: 300px;

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const StyledH1 = styled.h1`
  color: #fff;
  margin-top: 0;
`;

const StyledH5 = styled.h5`
  color: rgba(255, 255, 255, 0.7);
  font-weight: normal;
  &.error {
    color: #f44336;
  }
`;

const Chips = styled.div`
  margin-top: 0.5rem;
  display: flex;
  flex-wrap: wrap;
  height: 100px;
  max-height: 100px;
  overflow-y: auto;
`;

const StyledChip = styled(Chip)`
  margin: 0 0.5rem 0.5rem 0;
  background-color: ${props => `#${props.chipcolor}`};
  .MuiChip-label {
    color: ${props => props.chipcolor === 'FFFFFF' ? '#000' : '#fff'};
  }
`;

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      color: '#fff',
      backgroundColor: '#424242',
    },
  },
};
const Form = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [teams, setTeams] = useState({});
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const fetchedTeams = await fetchTeams();
      setTeams(fetchedTeams);
    };
    fetchData()
  }, [])

  const handleDelete = chipToDelete => () => {
    setSelectedTeams(selectedTeams.filter(team => team.alias !== chipToDelete.alias));
  }

  const handleSubmit = async () => {
    const data = {
      firstName,
      lastName,
      email,
      tags: [
        ...selectedTeams.map(selected => selected.name.toLowerCase()),
        'campaign: story of the day '
      ],
      status: 'subscribed',
      statusDate: new Date().toISOString(),
    };
    const errors = formErrors({ firstName, lastName, email });
    if (noErrors(errors)) {
      setErrors({});
      try {
        await subscribe(data);
        setSubmitStatus('success');
      } catch {
        setSubmitStatus('fail');
      }
    } else {
      setErrors(errors);
    }
  }

  return (
    <StyledForm>
      <div>
        <StyledH1>ClutchPoints NBA Mailing list</StyledH1>
        <StyledH5>Information will be collected for promotional purposes only.</StyledH5>
        <StyledH5>* Required</StyledH5>
      </div>
      <StyledFormFields>
        <StyledFormControl
          variant="filled"
          error={!!errors.firstName}
        >
          <InputLabel
            htmlFor="first-name"
            shrink
          >
            First Name
          </InputLabel>
          <FilledInput
            id="first-name"
            placeholder="John"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
          />
          <FormHelperText>
            {errors.firstName}
          </FormHelperText>
        </StyledFormControl>
        <StyledFormControl
          variant="filled"
          error={!!errors.lastName}
        >
          <InputLabel
            htmlFor="last-name"
            shrink
          >
            Last Name
          </InputLabel>
          <FilledInput
            id="last-name"
            placeholder="Doe"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          />
          <FormHelperText>
            {errors.lastName}
          </FormHelperText>
        </StyledFormControl>
        <StyledFormControl
          variant="filled"
          required
          error={!!errors.email}
        >
          <InputLabel
            htmlFor="email-address"
            shrink
          >
            Email Address
          </InputLabel>
          <FilledInput
            id="email-address"
            placeholder="example@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <FormHelperText>
            {errors.email}
          </FormHelperText>
        </StyledFormControl>
        <StyledFormControl
          variant="filled"
          required
        >
          <InputLabel
            htmlFor="team-select"
            shrink
          >
            Select Teams
          </InputLabel>
          <Select
            multiple
            value={selectedTeams}
            onChange={e => setSelectedTeams(e.target.value)}
            input={(
              <FilledInput
                id="email-address"
                placeholder="example@email.com"
              />)}
            MenuProps={MenuProps}
          >
            {Object.keys(teams).map(key => {
              const team = teams[key];
              const { alias, market, name } = team;
              if (market === 'Team') { return };
              return (
                <MenuItem
                  key={key}
                  value={team}
                >
                  {`${market} ${name}`}
                </MenuItem>
              )
            })}
          </Select>
          <Chips>
            {selectedTeams.map((selected) => {
              const { alias, name, team_color } = selected;
              return (
                <StyledChip
                  key={alias}
                  label={name}
                  chipcolor={team_color}
                  onDelete={handleDelete(selected)}
                  avatar={<Avatar alt={alias} src={require(`../images/nba-logos/${alias}_s.png`)} />}
                />
              );
            })}
          </Chips>
        </StyledFormControl>
      </StyledFormFields>
      <Button
        variant="contained"
        size="large"
        color="secondary"
        onClick={handleSubmit}
        disabled={submitStatus === 'success'}
      >
        Submit
      </Button>
      {submitStatus === 'fail' && (
        <StyledH5 className="error">There was a problem submitting your request.</StyledH5>
      )}
      {submitStatus === 'success' && (
        <StyledH5>Thank you for submitting your request.</StyledH5>
      )}
    </StyledForm>
  );
};

export default Form;
