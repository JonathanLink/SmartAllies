# Testing Guide - HR Partner Feature

## Quick Test Scenario

### Test Human Incident with HR Connection

**Step 1: Start Services**
```bash
# Terminal 1 - Backend
cd backend
mvn spring-boot:run

# Terminal 2 - Frontend
cd frontend
npm run dev
```

**Step 2: Open Browser**
```
http://localhost:5173
```

**Step 3: Report Human Incident**

**User:** "I'm being harassed by my manager"

**Bot:** "I understand this is a human incident... Is this correct?"

**User:** Click "Yes"

**Bot:** Shows empathy resources, asks "Would you like me to help you draft an incident report?"

**User:** Click "Yes, help me report this"

**Bot:** Collects details:
- **Who:** "My manager, John Smith"
- **What:** "Inappropriate comments about my appearance"
- **When:** "Started 2 months ago, happens weekly"
- **Where:** "In the office, near the break room"

**Step 4: HR Connection Decision Point** ⬅️ **THIS IS THE KEY MOMENT**

**Bot:** 
```
Thank you for sharing those details. Would you like to share more details 
about this incident, or would you prefer to connect with an HR partner 
who can provide confidential support? You will remain anonymous.

[Share more details]  [Connect to HR Partner]
```

**Step 5A: Test "Share more details" Path**
- Click "Share more details"
- Bot shows summary
- Shows Submit buttons

**Step 5B: Test "Connect to HR Partner" Path** 
- Click "Connect to HR Partner"
- **Interface switches to HR Chat**
- Shows HR partner (e.g., Sarah Mitchell) with profile pic
- HR greeting: "Hello, I'm Sarah from HR..."

**Step 6: Chat with HR Partner**
```
HR: Hello, I'm Sarah from HR. I'm here to help you with your concern.
    You can speak freely - this conversation is confidential and you 
    remain anonymous. How can I assist you today?

You: I need help with the harassment I reported.

HR: I'm sorry to hear that. Can you tell me more about how this has 
    been affecting you?

You: It makes me uncomfortable to come to work. I dread seeing him.

HR: That sounds very difficult. Have you documented any specific 
    incidents with dates?

[Continue conversation...]

You: I think that covers everything.

HR: Thank you for sharing this with me. I've documented everything. 
    Your case has been assigned ticket number: TKT-ABC12345
    
    This ticket is now in SUBMITTED status. Our team will review it...
```

**Step 7: Auto-Redirect**
- After 3 seconds, redirects to `/report/TKT-ABC12345`
- Shows full report with status timeline
- Status: SUBMITTED

---

## Expected Workflow States

```
Human Incident Flow:

INITIAL
  ↓ (user message)
AWAITING_CLASSIFICATION_CONFIRMATION
  ↓ (yes)
CLASSIFICATION_CONFIRMED
  ↓
AWAITING_REPORT_CONFIRMATION
  ↓ (yes)
COLLECTING_DETAILS
  ↓ (collected who/what/when/where)
AWAITING_HR_DECISION ⬅️ NEW STATE
  ↓
  ├─→ [Share more] → REPORT_READY → Submit
  └─→ [Connect HR] → HR_CONNECTED → HR Chat → Ticket
```

---

## Troubleshooting

### Issue: HR option doesn't appear
**Check:**
1. Is it a HUMAN incident? (not Facility/Emergency)
2. Have all details been collected? (who/what/when/where)
3. Check browser console for errors
4. Check backend logs for workflow state

### Issue: HR chat doesn't work
**Check:**
1. Is Ollama running? `curl http://localhost:11434/api/tags`
2. Is model available? Should see `mistral:latest`
3. Check backend logs for LLM errors
4. Verify `/api/hr/connect` and `/api/hr/chat` endpoints work

### Issue: Ticket not generated
**Check:**
1. Did conversation reach 8 messages?
2. Did user say completion phrase? ("that's all", "no more")
3. Check backend logs for ticket generation
4. Check `HRPartnerService` logs

---

## API Testing (Optional)

### Test HR Connection
```bash
# Get session ID from browser console or create one
SESSION_ID="test-$(date +%s)"

# Classify as human incident
curl -X POST http://localhost:8080/api/chat \
  -H "Content-Type: application/json" \
  -d "{
    \"sessionId\": \"$SESSION_ID\",
    \"message\": \"I'm being harassed at work\"
  }"

# Confirm classification
curl -X POST http://localhost:8080/api/chat \
  -H "Content-Type: application/json" \
  -d "{
    \"sessionId\": \"$SESSION_ID\",
    \"message\": \"Yes\"
  }"

# ... continue collecting details ...

# Connect to HR
curl -X POST http://localhost:8080/api/hr/connect \
  -H "Content-Type: application/json" \
  -d "{\"sessionId\": \"$SESSION_ID\"}"

# Chat with HR
curl -X POST http://localhost:8080/api/hr/chat \
  -H "Content-Type: application/json" \
  -d "{
    \"sessionId\": \"$SESSION_ID\",
    \"message\": \"I need help with harassment\"
  }"
```

---

## Success Criteria

✅ Bot asks about HR connection after collecting Human incident details
✅ Two options shown: "Share more details" / "Connect to HR Partner"
✅ Clicking "Connect to HR Partner" switches to HR chat interface
✅ HR partner has name and profile picture
✅ HR messages show profile pic
✅ User messages show "You" indicator
✅ LLM generates empathetic HR responses
✅ After 8 messages, ticket is generated
✅ Ticket format: `TKT-XXXXXXXX`
✅ Auto-redirect to report page
✅ Report shows SUBMITTED status
