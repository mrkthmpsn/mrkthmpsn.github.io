// Type for a single frame of match data on the `/frames` endpoint.
export type FrameData = {
  frame_idx: number;
  period: number;
  match_second: number;
  phase_second: number;
  ball_position: ObjectPosition | null;
  possession_phase: string;
  passing_opportunity: boolean;
  players: Array<PlayerObject>;
  defensive_block: DefensiveBlock | null;
  closest_opponent_to_ball: number | null;
  a_target_goal: Array<number>;
  b_target_goal: Array<number>;
  possession_target_end: number | null;
  distance_from_target_goal: number | null;
  in_block_opportunities: null;
  pitch_control_field: null;
};

export type DefensiveBlock = {
  top: number;
  bottom: number;
  left: number;
  right: number;
  area: number;
  north?: number;
  south?: number;
  east?: number;
  west?: number;
};

export type ObjectPosition = {
  x: number;
  y: number;
};

export type PlayerObject = {
  x: number;
  y: number;
  team: string;
  closest_opponent: number;
  within_opp_block: boolean;
  shirt_number: number;
};

export type KeyFrameData = {
  frame: number;
  period: number;
  possession_phase: string;
  nearest_opponent: number;
};

type MatchFramesInfo = {
  id: number;
  match_frame_count: number;
  min_frame_idx: number;
};

export type MatchFramesInfoWrapper = {
  data: Array<MatchFramesInfo>;
};

export type PlayersDataProps = {
  id: string;
  shirtNumber: number;
  positions: ObjectPosition[];
};

export type teamPlayersType = {
  [index: number]: PlayersDataProps;
};

export interface FramesDataType {
  [index: string]: FrameData;
}
