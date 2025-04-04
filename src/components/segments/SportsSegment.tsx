import { MatchDetails } from "./MatchDetails";
import { DropdownInput } from "../../components/atoms/DropdownInput";
import { useEffect, useRef, useState } from "react";
import { getCricketMatchesList, getPlayersList } from "../../actions/externaApiAction";
import { useDispatch, useSelector } from "react-redux";
import { getDataFromLocalStorage } from "../../utils/localStorageUtils";
import { FULL_CAMPAIGN_PLAN } from "../../constants/localStorageConstants";
import { message } from "antd";

interface SportsSegmentProps {
  sportOption?: any;
  setSportOption?: any;
  selectedMatchId?: any;
  setSelectedMatchId?: any;
  sport?: any;
  setSport?: any;
  player?: any;
  setPlayer?: any;
  condition?: any;
  setCondition?: any
  campaignDetails?: any;
  setTriggerSelected?: any;
}

interface Match {
  matchId: string;
  team1: string;
  team2: string;
}

interface MatchDropdownProps {
  matches?: Match[];
  selectedMatchId: string;
  setSelectedMatchId: (id: string) => void;
}

const SportDropdown = ({ sports, sport, setSport }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSportSelect = (selectedSport: string) => {
    setSport(selectedSport);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  return (
    <div className="relative w-full h-full" ref={dropdownRef}>
      {/* Dropdown button */}
      <button
        type="button"
        onClick={toggleDropdown}
        className={`w-full h-full truncate text-[14px] border border-gray-200 px-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-[#129BFF] hover:bg-[#FFFFFF] active:bg-[#FFFFFF] transition-colors rounded-md appearance-none text-left`}
      >
        {sport ? `${sports?.find((s: any) => s.value === sport).label}` : "Select Sport"}
      </button>

      {/* Dropdown icon */}
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
        <svg
          className="w-5 h-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      {/* Dropdown content */}
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
          {/* Default option */}
          <div
            onClick={() => handleSportSelect("")}
            className={`px-3 py-2 text-[14px] cursor-pointer ${
              sport === ""
                ? 'bg-[#129BFF] text-white'
                : 'hover:bg-gray-100'
            }`}
          >
            Select Sport
          </div>

          {/* Match options */}
          {sports?.map((sp: any) => (
            <div
              key={sp.value}
              onClick={() => handleSportSelect(sp.value)}
              className={`px-3 py-2 text-[14px] cursor-pointer ${
                sport === sp.value
                  ? 'bg-[#129BFF] text-white'
                  : 'hover:bg-gray-100'
              }`}
            >
              {`${sp.label}`}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


const MatchDropdown = ({ matches, selectedMatchId, setSelectedMatchId }: MatchDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleMatchSelect = (matchId: any) => {
    setSelectedMatchId(matchId);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Find the selected match for display
  const selectedMatch = matches?.find(m => m.matchId === selectedMatchId);

  return (
    <div className="relative w-full h-full" ref={dropdownRef}>
      {/* Dropdown button */}
      <button
        type="button"
        onClick={toggleDropdown}
        className={`w-full h-full truncate text-[14px] border border-gray-200 px-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-[#129BFF] hover:bg-[#FFFFFF] active:bg-[#FFFFFF] transition-colors rounded-md appearance-none text-left`}
      >
        {selectedMatch ? `${selectedMatch.team1} vs ${selectedMatch.team2}` : "Select Match"}
      </button>

      {/* Dropdown icon */}
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
        <svg
          className="w-5 h-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      {/* Dropdown content */}
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
          {/* Default option */}
          <div
            // onClick={() => handleMatchSelect("")}
            className={`px-3 py-2 text-[14px] cursor-pointer ${
              selectedMatchId === ""
                ? 'bg-[#129BFF] text-white'
                : 'hover:bg-gray-100'
            }`}
          >
            Select Match
          </div>

          {/* Match options */}
          {matches?.map((match) => (
            <div
              key={match.matchId}
              onClick={() => handleMatchSelect(match.matchId)}
              className={`px-3 py-2 text-[14px] cursor-pointer ${
                selectedMatchId === match.matchId
                  ? 'bg-[#129BFF] text-white'
                  : 'hover:bg-gray-100'
              }`}
            >
              {`${match.team1} vs ${match.team2}`}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const TeamDropdown = ({teamData}: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [selectedTeam, setSelectedTeam] = useState<string>(Object.keys(teamData)[0]);
  const [selectedPlayer, setSelectedPlayer] = useState<string>('');

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleTeamSelect = (team: string) => {
    setSelectedTeam(team);
    setSelectedPlayer(''); // Reset player selection when team changes
  };

  const handlePlayerSelect = (player: string) => {
    setSelectedPlayer(player);
    setIsOpen(false); // Close dropdown after player selection
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full h-full" ref={dropdownRef}>
      {/* Dropdown button */}
      <button
        type="button"
        onClick={toggleDropdown}
        className={`w-full h-full truncate text-[14px] border border-gray-200 px-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-[#129BFF] hover:bg-[#FFFFFF] active:bg-[#FFFFFF] transition-colors rounded-md appearance-none text-left`}
      >
        {selectedPlayer || `Select a player`}
      </button>

      {/* Dropdown content */}
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
          {/* Team tabs */}
          <div className="flex border-b border-gray-200">
            {Object.keys(teamData).map((team) => (
              <button
                key={team}
                onClick={() => handleTeamSelect(team)}
                className={`flex-1 py-2 px-4 text-sm font-medium ${
                  selectedTeam === team
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {team}
              </button>
            ))}
          </div>

          {/* Player list */}
          <div className="max-h-60 overflow-y-auto">
            {teamData[selectedTeam].map((player: any) => (
              <div
                key={player}
                onClick={() => handlePlayerSelect(player)}
                className={`px-4 py-2 text-sm cursor-pointer ${
                  selectedPlayer === player
                    ? 'bg-blue-100 text-blue-800'
                    : 'hover:bg-gray-100'
                }`}
              >
                {player}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const ConditionsDropdown = ({ conditions, condition, setCondition }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleConditionSelect = (selectedCondition: string) => {
    setCondition(condition);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  return (
    <div className="relative w-full h-full" ref={dropdownRef}>
      {/* Dropdown button */}
      <button
        type="button"
        onClick={toggleDropdown}
        className={`w-full h-full truncate text-[14px] border border-gray-200 px-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-[#129BFF] hover:bg-[#FFFFFF] active:bg-[#FFFFFF] transition-colors rounded-md appearance-none text-left`}
      >
        {condition ? `${conditions?.find((s: any) => s.value === condition).label}` : "Select Match Condition"}
      </button>

      {/* Dropdown icon */}
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
        <svg
          className="w-5 h-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      {/* Dropdown content */}
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
          {/* Default option */}
          <div
            onClick={() => handleConditionSelect("")}
            className={`px-3 py-2 text-[14px] cursor-pointer ${
              condition === ""
                ? 'bg-[#129BFF] text-white'
                : 'hover:bg-gray-100'
            }`}
          >
            Select Sport
          </div>

          {/* Match options */}
          {conditions?.map((sp: any) => (
            <div
              key={sp.value}
              onClick={() => handleConditionSelect(sp.value)}
              className={`px-3 py-2 text-[14px] cursor-pointer ${
                condition === sp.value
                  ? 'bg-[#129BFF] text-white'
                  : 'hover:bg-gray-100'
              }`}
            >
              {`${sp.label}`}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const SportsSegment = ({
  campaignDetails,
  selectedMatchId,
  setSelectedMatchId,
  sport,
  setSport,
  condition,
  setCondition,
}: SportsSegmentProps) => {
  const dispatch = useDispatch<any>();

  const sportOptions = [{
    label: "Cricket",
    value: "cricket"
  }];

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



  const [myMatches, setMyMatches] = useState<any>(null);
  const [players, setPlayers] = useState<any>({});

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
    data: matchPlayers,
  } = playersListGet;


  useEffect(() => {
    if (errorMatches) {
      message.error("Error in getting matches list, please select a different sport...")
    }
    // if (errorPlayers) {
    //   message.error("Error in getting players list, please select a different match...")
    // }
    if (selectedMatchId) {
      dispatch(getPlayersList({id: selectedMatchId}));
    }
    dispatch(getCricketMatchesList());
  },[dispatch, errorMatches, selectedMatchId]);

  useEffect(() => {
    if (matches && !myMatches) {
      const filteredMatches = matches.filter((match: any) => {
        const currentDate = new Date(match?.startDate);
        return currentDate >= new Date(campaignDetails?.startDate) && currentDate <= new Date(campaignDetails?.endDate);
      });
      setMyMatches(filteredMatches);
    }

    if(matchPlayers) {
      setPlayers(matchPlayers);
    }

  },[matches, matchPlayers, myMatches, campaignDetails]);

  return (
    <div className="py-4 border-b">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-4">
          <div className={`border rounded h-full w-full flex items-center`}>
          <SportDropdown 
            sports={sportOptions}
            setSport={setSport}
            sport={sport}
          />
          </div>
        </div>
        
        <div className="col-span-4">
          {loadingMatches ? (
            <div className="border rounded h-full flex items-center">
              <h1 className="text-[14px] px-2">Loading....</h1>
            </div>
          ) : (
            <div className="border rounded h-full flex items-center">
              <MatchDropdown selectedMatchId={selectedMatchId} setSelectedMatchId={setSelectedMatchId} matches={myMatches} />
            </div>
          )}
        </div>
        <div className="col-span-4">
          {loadingPlayers ? (
            <div className="border rounded h-full flex items-center">
              <h1 className="text-[14px] px-2">Loading...</h1>
            </div>
          ) : (
            <div className="border rounded h-full flex items-center">
              {Object.keys(players)?.length > 0 ? (
                <TeamDropdown teamData={players} />
              ) : (
                <h1 className="text-[14px] px-2 truncate">Select Match first</h1>
              )}
            </div>
          )}
        </div>
        
      </div>
      {myMatches && (
        <div className="w-full">
          <div className="w-full">
            <h1 className="px-1 pt-4 text-[14px]">Match Details</h1>
            <MatchDetails details={myMatches?.filter((m: any) => Number(m.matchId) === Number(selectedMatchId)) || myMatches[0]} />
          </div>
          <div className="border rounded h-full flex items-center">
            <ConditionsDropdown setCondition={setCondition} condition={condition} conditions={options} />
          </div>
        </div>
      )}
    </div>
  )}