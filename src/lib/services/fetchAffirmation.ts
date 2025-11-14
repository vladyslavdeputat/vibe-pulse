export default async function fetchAffirmation({
  setAffirmation,
  setError,
  setIsLoading,
}: {
  setAffirmation: (affirmation: string) => void;
  setError: (error: string) => void;
  setIsLoading: (isLoading: boolean) => void;
}) {
  try {
    setIsLoading(true);
    setError("");
    setAffirmation("");

    const response = await fetch("/api/affirmation", {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("We couldn’t fetch an affirmation. Please try again.");
    }

    const data = (await response.json()) as { affirmation?: string };

    if (!data.affirmation) {
      throw new Error("Unexpected response from the affirmation service.");
    }

    setAffirmation(data.affirmation);
  } catch (err) {
    const message =
      err instanceof Error
        ? err.message
        : "Something went wrong. Please try again.";
    setError(message);
  } finally {
    setIsLoading(false);
  }
}
