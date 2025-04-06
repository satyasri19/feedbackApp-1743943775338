// Automated feedback generation engine
const FeedbackEngine = {
    // Generate feedback for a student submission
    generateFeedback(submissionText) {
        const analysis = this.analyzeText(submissionText);
        return {
            score: this.calculateScore(analysis),
            strengths: this.identifyStrengths(analysis),
            areasForImprovement: this.identifyImprovements(analysis),
            detailedFeedback: this.generateDetailedFeedback(analysis),
            timestamp: new Date().toISOString()
        };
    },

    // Analyze the submission text
    analyzeText(text) {
        const wordCount = text.split(/\s+/).length;
        const sentenceCount = text.split(/[.!?]+/).length - 1;
        const paragraphCount = text.split(/\n\s*\n/).length;

        // Simple keyword analysis (would be enhanced in production)
        const keywords = {
            thesis: (text.match(/\b(thesis|argument|claim)\b/gi) || []).length,
            evidence: (text.match(/\b(evidence|example|quote)\b/gi) || []).length,
            analysis: (text.match(/\b(analyze|explain|interpret)\b/gi) || []).length,
            grammarIssues: this.checkGrammar(text)
        };

        return {
            wordCount,
            sentenceCount,
            paragraphCount,
            keywords,
            readabilityScore: this.calculateReadability(text)
        };
    },

    // Calculate a score based on analysis
    calculateScore(analysis) {
        let score = 0;
        
        // Score based on length
        if (analysis.wordCount > 200) score += 20;
        else if (analysis.wordCount > 100) score += 10;
        
        // Score based on structure
        if (analysis.paragraphCount >= 3) score += 20;
        
        // Score based on content elements
        score += Math.min(analysis.keywords.thesis * 5, 15);
        score += Math.min(analysis.keywords.evidence * 3, 15);
        score += Math.min(analysis.keywords.analysis * 3, 15);
        
        // Deduct for grammar issues
        score -= Math.min(analysis.keywords.grammarIssues.length * 2, 15);
        
        // Add readability bonus
        score += analysis.readabilityScore * 0.5;
        
        return Math.max(0, Math.min(100, score));
    },

    // Identify strengths in the submission
    identifyStrengths(analysis) {
        const strengths = [];
        
        if (analysis.wordCount > 200) strengths.push("Good length and development");
        if (analysis.paragraphCount >= 3) strengths.push("Well-structured with clear paragraphs");
        if (analysis.keywords.thesis >= 1) strengths.push("Clear thesis statement");
        if (analysis.keywords.evidence >= 2) strengths.push("Good use of supporting evidence");
        if (analysis.keywords.analysis >= 2) strengths.push("Strong analysis and interpretation");
        
        return strengths.length > 0 ? strengths : ["Good effort on this assignment"];
    },

    // Identify areas for improvement
    identifyImprovements(analysis) {
        const improvements = [];
        
        if (analysis.wordCount < 150) improvements.push("Consider expanding your ideas further");
        if (analysis.paragraphCount < 3) improvements.push("Try organizing into more paragraphs");
        if (analysis.keywords.thesis < 1) improvements.push("Include a clearer thesis statement");
        if (analysis.keywords.evidence < 2) improvements.push("Add more supporting evidence");
        if (analysis.keywords.analysis < 2) improvements.push("Include more analysis of your evidence");
        if (analysis.keywords.grammarIssues.length > 0) {
            improvements.push(`Review grammar: ${analysis.keywords.grammarIssues.join(', ')}`);
        }
        
        return improvements.length > 0 ? improvements : ["No major areas for improvement"];
    },

    // Generate detailed feedback comments
    generateDetailedFeedback(analysis) {
        let feedback = "";
        
        // Structure feedback
        feedback += `Your submission contains ${analysis.wordCount} words, organized into ${analysis.paragraphCount} paragraphs. `;
        
        // Content feedback
        if (analysis.keywords.thesis > 0) {
            feedback += "You've included a clear thesis statement, which helps guide your argument. ";
        } else {
            feedback += "Consider adding a clearer thesis statement to guide your argument. ";
        }
        
        if (analysis.keywords.evidence > 1) {
            feedback += "You've supported your points with multiple pieces of evidence. ";
        } else {
            feedback += "Try to include more evidence to support your claims. ";
        }
        
        // Grammar feedback
        if (analysis.keywords.grammarIssues.length > 0) {
            feedback += `Watch out for these grammar issues: ${analysis.keywords.grammarIssues.join(', ')}. `;
        }
        
        return feedback;
    },

    // Simple grammar checker (would be enhanced in production)
    checkGrammar(text) {
        const issues = [];
        
        // Check for common issues
        if (text.match(/their\s+[^\.]*?there/) || text.match(/there\s+[^\.]*?their/)) {
            issues.push("their/there confusion");
        }
        if (text.match(/your\s+[^\.]*?you're/) || text.match(/you're\s+[^\.]*?your/)) {
            issues.push("your/you're confusion");
        }
        if (text.match(/\b(a|an)\s+[aeiou][a-z]+\b/gi)) {
            const matches = text.match(/\b(a|an)\s+[aeiou][a-z]+\b/gi);
            matches.forEach(match => {
                const words = match.split(/\s+/);
                if ((words[0].toLowerCase() === 'a' && 'aeiou'.includes(words[1][0].toLowerCase())) ||
                    (words[0].toLowerCase() === 'an' && !'aeiou'.includes(words[1][0].toLowerCase()))) {
                    issues.push(`article agreement: ${match}`);
                }
            });
        }
        
        return issues;
    },

    // Simple readability score (Flesch-Kincaid approximation)
    calculateReadability(text) {
        const words = text.split(/\s+/);
        const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
        const syllables = this.countSyllables(text);
        
        if (sentences.length === 0 || words.length === 0) return 0;
        
        const wordsPerSentence = words.length / sentences.length;
        const syllablesPerWord = syllables / words.length;
        
        // Flesch Reading Ease approximation
        return Math.max(0, Math.min(100, 
            206.835 - (1.015 * wordsPerSentence) - (84.6 * syllablesPerWord)
        ));
    },

    // Approximate syllable counting
    countSyllables(text) {
        const words = text.toLowerCase().split(/\s+/);
        let count = 0;
        
        words.forEach(word => {
            word = word.replace(/'s$/, '').replace(/[^a-z]/g, '');
            if (word.length <= 3) {
                count += 1;
                return;
            }
            
            count += word
                .replace(/[^aeiouy]/g, ' ')
                .replace(/\s+/g, ' ')
                .trim()
                .split(' ')
                .length;
        });
        
        return count;
    }
};

// Make available for other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FeedbackEngine;
}