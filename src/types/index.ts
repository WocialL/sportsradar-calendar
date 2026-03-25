export interface Team{
  name: string;
  officialName: string;
  abbreviation: string;
  teamCountryCode: string;
}

export interface SportEvent{
  id: string;
  season: number;
  status: string;
  timeVenueUTC: string;
  dateVenue: string;
  homeTeam: Team | null;
  awayTeam: Team | null;
  originCompetitionName: string;
}