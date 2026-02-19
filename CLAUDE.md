# CLAUDE.md

## General
Dobrze aby główny agent był raczej managerem i uruchamiał agentów specjalistów w celu implementacji konkretych funkcji lub podfunckji.
Development, testowanie czy review powinno zawsze odbywać się równolegle jeżeli możliwe przy użyciu kilku agentów.

## Plan

Always put plan in plan directory with convention plan/<feature_name>.md
Plan each feature in spearate md file.md

If possible assure that each phase in feature is testable by running game.

Always use separate "Plan" agent for writing plan.

## Test

Pamiętaj o pisaniu testów.

## Development

Pisanie kodu powinno odbywać się z zachowaniem najwyższych standardów jakości.

### Development Workflow (MUST FOLLOW)

Każda faza implementacji MUSI przejść przez następujące kroki:

1. **Implementation**:
   - Użyj `senior-developer` agent do implementacji funkcjonalności
   - Development może odbywać się równolegle (wiele agentów)

2. **Testing**:
   - Uruchom testy: `npm run test`
   - Wszystkie testy MUSZĄ przechodzić (zielone)
   - Fix failing tests przed przejściem dalej

3. **Code Review (MANDATORY - BLOCKING)**:
   - **ZAWSZE** uruchom **2 niezależnych** agentów `code-quality-reviewer`
   - **Agent 1**: Perspektywa Performance & Technical Quality
   - **Agent 2**: Perspektywa Architecture & Maintainability
   - **Dlaczego 2 reviewerów?** Różne perspektywy łapią komplementarne problemy:
     - Jeden może złapać performance issues
     - Drugi może złapać design issues
     - Razem dają pełniejszy obraz jakości kodu
   - Uruchamiaj agentów **równolegle** (w jednym message, 2 Task calls)

4. **Fix Issues**:
   - **Priority 1 (Critical/Must-Fix)**: Napraw WSZYSTKIE przed przejściem dalej - BLOCKING
   - **Priority 2 (Major/Should-Fix)**: Napraw lub udokumentuj dlaczego odkładasz
   - **Priority 3 (Minor/Nice-to-Have)**: Opcjonalne, do rozważenia

5. **Verification**:
   - Uruchom `npm run test` ponownie po fixach
   - Uruchom `npx tsc --noEmit` dla TypeScript validation
   - Wszystko musi być zielone

6. **Ready for Commit**:
   - Kod jest gotowy do commit
   - **Podaj commit message** w formacie:
     - Tytuł: krótki opis (max 72 znaki), imperatywny tryb
     - Treść: lista zmian, co zostało dodane/naprawione
     - Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
   - **NIE uruchamiaj** `git commit` - user robi commit samodzielnie
   - User zdecyduje kiedy commitować, ale dostaje gotowy message

**WAŻNE**: Kroki 1-5 są BLOKUJĄCE. Nie przechodzimy do kolejnej fazy bez ukończenia wszystkich kroków.

### Code Review - Przykład użycia

```
Po zakończeniu implementacji i przejściu testów:

// Uruchom 2 reviewerów RÓWNOLEGLE w jednym message:
Task(subagent_type: code-quality-reviewer, description: "Review Phase X - Reviewer 1")
Task(subagent_type: code-quality-reviewer, description: "Review Phase X - Reviewer 2")

// Poczekaj na oba review
// Przeanalizuj znaleziska
// Napraw Priority 1 issues
// Zweryfikuj testy
// Podaj commit message - user zrobi commit
```

---