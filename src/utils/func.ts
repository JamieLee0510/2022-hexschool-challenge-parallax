export function getProgress(ref: React.RefObject<HTMLDivElement>): number {
    const scrollPosition = window.scrollY + window.innerHeight;

    // Get element's position relative to bottom of viewport.
    const elPosition = scrollPosition - ref.current!.offsetTop;

    // Set desired duration.
    const durationDistance = window.innerHeight + ref.current!.offsetHeight;
    // Calculate tween progresss.
    const result = elPosition / durationDistance;
    return result;
}
