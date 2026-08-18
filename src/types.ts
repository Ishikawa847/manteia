export const AXIS_IDS = ['good', 'knowledge', 'society', 'stance'] as const
export type AxisId = (typeof AXIS_IDS)[number]
export type Coordinate = Record<AxisId, number>
export const PHILOSOPHER_IDS = [
  'socrates',
  'plato',
  'aristotle',
  'epicurus',
  'diogenes',
  'zeno',
] as const
export type PhilosopherId = (typeof PHILOSOPHER_IDS)[number]
export type Choice = {
  label: string;
  scores: Partial<Record<AxisId, number>>;
}
export type Question = {
  id: number;
  text: string;
  choices: readonly Choice[];
}
export type Philosopher = {
  id: PhilosopherId;
  name: string;
  school?: string;
  coordinate: Coordinate;
  description: string;
}