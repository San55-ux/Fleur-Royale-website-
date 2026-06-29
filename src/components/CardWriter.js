export function renderCardWriter(containerId, onCardUpdate) {
  const container = document.getElementById(containerId);
  if (!container) return;

  // Local state
  let envelopeStyle = 'emerald';
  let cardMessage = '';

  function renderWidget() {
    container.innerHTML = `
      <div class="letter-envelope ${envelopeStyle}" id="envelope-simulator">
        <!-- Paper sliding out on hover -->
        <div class="letter-paper" id="paper-simulator">
          <div class="letter-watermark">Fleur Royale</div>
          <div class="letter-body" id="card-preview-text">
            ${cardMessage || 'Your message will appear here in calligraphy...'}
          </div>
          <div class="letter-footer">With Love</div>
        </div>
      </div>
    `;
  }

  // Bind actions to inputs in the index.html template
  function bindComposerEvents() {
    const textInput = document.getElementById('card-text-input');
    const charCount = document.getElementById('card-char-count');
    const styleBtns = document.querySelectorAll('.env-opt-btn');

    if (textInput) {
      // Sync message text
      textInput.addEventListener('input', (e) => {
        cardMessage = e.target.value;
        
        // Update character counter
        if (charCount) {
          charCount.innerText = cardMessage.length;
        }

        // Update card preview text directly for zero latency
        const previewText = document.getElementById('card-preview-text');
        if (previewText) {
          previewText.innerText = cardMessage || 'Your message will appear here in calligraphy...';
        }

        // Notify state parent
        notifyCard();
      });
    }

    styleBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        envelopeStyle = btn.getAttribute('data-style');
        
        // Toggle button active class
        styleBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Update envelope class directly
        const envelope = document.getElementById('envelope-simulator');
        if (envelope) {
          envelope.className = `letter-envelope ${envelopeStyle}`;
        }

        notifyCard();
      });
    });
  }

  function notifyCard() {
    onCardUpdate({
      style: envelopeStyle,
      message: cardMessage
    });
  }

  // Run initial preview renders
  renderWidget();
  bindComposerEvents();
}
