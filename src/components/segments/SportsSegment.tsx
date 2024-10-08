import { MatchDetails } from "./MatchDetails";
import { DropdownInput } from "../../components/atoms/DropdownInput";
import { useEffect, useState } from "react";
import { getCricketMatchesList, getPlayersList } from "../../actions/externaApiAction";
import { useDispatch, useSelector } from "react-redux";
import { getDataFromLocalStorage } from "../../utils/localStorageUtils";

interface SportsSegmentProps {
  currentTab?: any;
}
export const SportsSegment = ({}: SportsSegmentProps) => {
  const dispatch = useDispatch<any>();
  const options = [{
    label: "Hits 6",
    value: "six",
  },{
    label: "Hits 4",
    value: "four"
  },{
    label: "Scores 100",
    value: "century"
  },{
    label: "Scores 50",
    value: "halfCentury"
  },{
    label: "Bowls Out",
    value: "bowlsOut"
  },{
    label: "Takes Catch",
    value: "catching"
  },{
    label: "During Batting",
    value: "batting"
  },{
    label: "During Bowling",
    value: "bowling"
  }];

  const [sportOptions, setSportOptions] = useState<any>([{
    label: "Cricket",
    value: "cricket"
  }]);

  const [myMatches, setMyMatches] = useState<any>(null);
  const [selectedMatchId, setSelectedMatchId] = useState<any>(null);
  const [sport, setSport] = useState<any>(null);
  const [player, setPlayer] = useState<any>(null);
  const [criteria, setCriteria] = useState<any>(null);



  const cricketMatchesListGet = useSelector((state: any) => state.cricketMatchesListGet);
  const {
    loading: loadingMatches,
    error: errorMatches,
    data: matches,
  } = cricketMatchesListGet;

  const playersListGet = useSelector((state: any) => state.playersListGet);
  const {
    loading: loadingPlayers,
    error: errorPlayers,
    data: players,
  } = playersListGet;


  useEffect(() => {
    dispatch(getPlayersList({id: selectedMatchId}));
    dispatch(getCricketMatchesList());
  },[dispatch, selectedMatchId]);

  useEffect(() => {
    if (matches && !myMatches) {
      const campaign = getDataFromLocalStorage("campaign").basicDetails;
      const filteredMatches = matches.filter((match: any) => {
        const currentDate = new Date(match.startDate);
        return currentDate >= new Date(campaign.startDate) && currentDate <= new Date(campaign.endDate);
      });
      setMyMatches(filteredMatches);
    }

  },[matches, players, myMatches]);

  return (
    <div className="py-4 border-b">
      <div className="flex gap-4 justify-between">
        <DropdownInput 
          options={sportOptions}
          setSelectedOption={setSport}
          selectedOption={sport}
        />
        {loadingPlayers ? (
          <h1>Loading...</h1>
        ) : (
        <DropdownInput
          options={players}
          setSelectedOption={setPlayer}
          selectedOption={player}
        />
      )}

        {loadingMatches ? (
          <h1>Loading....</h1>
        ) : (
          <DropdownInput
            setSelectedOption={setSelectedMatchId}
            selectedOption={selectedMatchId}
            options={
              myMatches?.map((m: any) => {
                return {
                  label: `${m.team1} vs ${m.team2}`,
                  value: m.matchId
                }
              })
            }
          />
        )}
      </div>
      {myMatches && (
        <div className="">
          <h1 className="px-1 pt-4 text-[14px]">Match Details</h1>
          <MatchDetails details={myMatches?.filter((m: any) => Number(m.matchId) === Number(selectedMatchId)) || myMatches[0]} />
        </div>
      )}

      <div className="">
        <h1 className="px-1 py-2 text-[14px]">Choose a condition</h1>
        <DropdownInput
          setSelectedOption={setCriteria}
          selectedOption={criteria}
          options={options}
        />
      </div>
    </div>
  )}