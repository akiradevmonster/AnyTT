export type NextTime = number;

export type Timetable = {
  id: string;
  calendar: number[];
  data: number[] | null;
};

export type Route = {
  id: string;
  origin: string;
  via: string | null;
  destination: string;
  headsign: string | null;
};

export type Contact = {
  id: string;
  sequence: number;
  route: Route;
  timetable: Timetable;
};

export type Stop = {
  id: string;
  name: string;
  agency: {
    id: string;
    name: string;
  };
  contacts: Contact[];
};

export type StopWithPath = {
  distance: number;
  stop: Stop;
};

export type Residence = {
  id: string;
  slug: string;
  name: string;
  stops: StopWithPath[];
};
