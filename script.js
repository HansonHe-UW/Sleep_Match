document.addEventListener('DOMContentLoaded', () => {
    const calculateBtn = document.getElementById('calculateBtn');
    const resultPanel = document.getElementById('result');

    calculateBtn.addEventListener('click', calculateSleep);

    function calculateSleep() {
        // Get inputs
        const age = parseInt(document.getElementById('age').value);
        const activity = document.getElementById('activity').value;
        const caffeine = parseInt(document.getElementById('caffeine').value) || 0;
        const wakeTimeVal = document.getElementById('wakeTime').value;

        // Validation
        if (!age || age <= 0) {
            alert("Please enter a valid age.");
            return;
        }

        // 1. Calculate Duration (Ported from Python)
        let baseSleep = 7.0;
        if (age <= 25) baseSleep = 8.0;
        else if (age <= 64) baseSleep = 7.5;

        let activityAdd = 0;
        let activityReason = "Low activity adds 0h";
        if (activity === "high") {
            activityAdd = 0.5;
            activityReason = "High activity adds 0.5h";
        } else if (activity === "medium") {
            activityAdd = 0.25;
            activityReason = "Medium activity adds 0.25h";
        }

        let caffeineAdd = 0;
        let caffeineReason = "Low caffeine adds 0h";
        if (caffeine >= 4) {
            caffeineAdd = 0.75;
            caffeineReason = "High caffeine (4+ cups) adds 0.75h";
        } else if (caffeine >= 2) {
            caffeineAdd = 0.25;
            caffeineReason = "Moderate caffeine (2-3 cups) adds 0.25h";
        }

        const totalSleep = baseSleep + activityAdd + caffeineAdd;

        // 2. Calculate Bedtime Window (Sleep Cycles)
        let bedtimeText = "Set a wake-up time to see optimal bedtimes.";

        if (wakeTimeVal) {
            const now = new Date();
            const [wakeHour, wakeMinute] = wakeTimeVal.split(':').map(Number);

            // Create wake date object (assuming next occurrence)
            let wakeDate = new Date();
            wakeDate.setHours(wakeHour, wakeMinute, 0, 0);

            // If wake time is earlier than now, assume it's tomorrow
            if (wakeDate < now) {
                wakeDate.setDate(wakeDate.getDate() + 1);
            }

            // Calculate bedtimes for 5 and 6 cycles (90 mins each)
            // 5 cycles = 7.5 hours
            // 6 cycles = 9.0 hours
            // Plus 15 mins to fall asleep

            const msPerCycle = 90 * 60 * 1000;
            const fallAsleepBuffer = 15 * 60 * 1000;

            const timeFor6Cycles = new Date(wakeDate.getTime() - (6 * msPerCycle) - fallAsleepBuffer);
            const timeFor5Cycles = new Date(wakeDate.getTime() - (5 * msPerCycle) - fallAsleepBuffer);

            const formatTime = (date) => {
                return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            };

            bedtimeText = `${formatTime(timeFor6Cycles)} or ${formatTime(timeFor5Cycles)}`;
        }

        // 3. Update UI
        document.getElementById('targetSleep').textContent = totalSleep.toFixed(2);
        document.getElementById('bedtimeWindow').textContent = bedtimeText;
        document.getElementById('reasonText').textContent =
            `Base sleep for age ${age} is ${baseSleep}h. ${activityReason}. ${caffeineReason}.`;

        // Show results
        resultPanel.classList.remove('hidden');
        // Small delay to allow display:block to apply before opacity transition
        setTimeout(() => {
            resultPanel.classList.add('visible');
        }, 10);
    }
});
