export type JournalFormValues = {
  text: string;
  mood?: string | null;
  stressLevel: number;
  tags: string[];
};

export type JournalFormProps = {
  initialValues?: Partial<JournalFormValues>;
};

export type JournalAnalysis = {
  mood: string;
  stressLevel: number;
  topic: string;
  summary: string;
  advice: string;
};
