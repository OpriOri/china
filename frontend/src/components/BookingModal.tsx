import { X } from "lucide-react";
import { getProgramById } from "../data/siteData";
import type { ProgramId } from "../data/siteData";
import { LeadForm } from "./LeadForm";

export function BookingModal({
  selectedProgramId,
  onClose,
}: {
  selectedProgramId: ProgramId;
  onClose: () => void;
}) {
  const selectedProgram = getProgramById(selectedProgramId);

  return (
    <div className="booking-modal" role="dialog" aria-modal="true" aria-labelledby="booking-title">
      <button className="booking-modal__backdrop" type="button" aria-label="Закрыть бронь" onClick={onClose} />
      <div className="booking-modal__panel">
        <button className="booking-modal__close" type="button" aria-label="Закрыть бронь" onClick={onClose}>
          <X size={20} />
        </button>
        <div className="booking-modal__summary">
          <span>Выбранный тур</span>
          <h2 id="booking-title">{selectedProgram.title}</h2>
          <p>{selectedProgram.date} / {selectedProgram.price}</p>
        </div>
        <LeadForm compact selectedProgramId={selectedProgramId} />
      </div>
    </div>
  );
}
