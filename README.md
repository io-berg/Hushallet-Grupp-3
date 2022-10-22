# KRAVLISTA

## Krav för godkänt

#### Kravlista

- [ ] En logga, splashscreen och appikon ska designas och användas.
- [x] Applikationen ska byggas med RN, Expo & TS.
- [ ] Designen av appen ska utgå ifrån befintliga skisser, undantag kan ges men ska diskuteras
      med produktägare, godkännas och dokumenteras.

#### Hushåll

- [ ] Ett hushåll ska ha ett namn och en genererad (enkel) kod så andra kan gå med i hushållet,
      namnet ska gå att ändra.

#### Konto

- [x] En användare ska kunna registrera och logga in sig.
- [x] En användare ska kunna skapa ett nytt hushåll.
- [ ] En användare ska kunna gå med i ett hushåll genom att ange hushållets kod.

#### Profil

- [ ] En användare ska kunna ange sitt namn.
- [ ] En användare ska kunna välja en avatar (emoji-djur + färg) från en fördefinierad lista.
- [ ] Valda avatarer ska inte kunna väljas av andra användare i hushållet.
- [ ] Avataren ska användas i appen för att visa vad användaren har gjort.

#### Sysslor

- [ ] En ägare ska kunna lägga till sysslor att göra i hemmet.
- [ ] En syssla ska ha ett namn, en beskrivning (text), hur ofta den ska göras (dagar), och en vikt som beskriver hur energikrävande den är.
- [ ] En ägare ska kunna redigera en syssla.

#### Dagsvyn

- [ ] Alla sysslor ska listas i en dagsvy och ge en översikt kring vad som behöver göras.
- [ ] Utöver sysslans namn ska även vem/vilka som har gjort sysslan visas, hur många dagar
      sedan sysslan gjordes senast samt om den är försenad.
- [ ] När en användare väljer en syssla ska beskrivningen av sysslan visas och det ska även
      med ett enkelt tryck gå att markera sysslan som gjord.

#### Statistik

- [ ] En användare ska kunna se fördelningen av gjorda sysslor mellan användarna i sitt hushåll.
- [ ] Varje statistikvy ska visa den totala fördelningen (inräknat vikterna för sysslorna) samt fördelning av varje enskild syssla.
- [ ] Det ska finnas en statistikvy över ”nuvarande vecka”.

## Krav för VG

#### Kravlista

- [x] Information ska kommuniceras till och från en server.

#### Hushåll

- [x] Alla användare i ett hushåll ska kunna se vilka som tillhör ett hushåll.
- [ ] En ägare av ett hushåll ska kunna se förfrågningar om att gå med i hushållet.
- [ ] En ägare ska kunna acceptera eller neka förfrågningar.
- [ ] En ägare ska kunna göra andra till ägare.

#### Konto

- [ ] När en användare har valt att gå med i ett hushåll behöver en ägare av hushållet först godkänna användaren.
- [ ] En användare ska kunna lämna ett hushåll.

#### Profil

- [ ] En användare ska kunna ställa in appens utseende (mörkt, ljust, auto)
- [ ] Om en användare tillhör två eller fler hushåll ska denne kunna välja att byta mellan de olika hushållen.

#### Sysslor

- [ ] En ägare ska kunna ta bort en syssla.
- [ ] När en syssla tas bort ska användaren få en varning om att all statistik gällande sysslan också kommer att tas bort och få valet att arkivera sysslan istället.

#### Statistik

- [ ] Det ska finnas en statistikvy över ”förra vecka”.
- [ ] Det ska finnas en statistikvy över ”förra månaden”
- [ ] Om det inte finns statistik för en av vyerna ska den vyn inte visas.

# Övriga krav

- [ ] En ägare ska kunna pausa en användare och under pausade perioder ska användare inte
      tas med i statistiken.
- [ ] Om en använder har pausats under en del av en period i statistiken ska graferna
      normaliseras.

- [ ] En ägare ska kunna tilldela och ta bort sysslor från användare i
      hushållet.
- [ ] Användare ska kunna se de tilldelade sysslorna i sitt
      gränssnitt.
- [ ] En ägare ska kunna skapa grupper av sysslor som automatiskt tilldelas användarna i
      hushållet och roteras baserat på ett intervall i dagar

- [ ] En användare ska kunna lägga till en ljudinspelning och en bild för att beskriva sysslan ytterligare.

### Handledning

#### v1:

- Screens och modeller godkännda
- Designa en meny för navigering och få godkänt på den nästa handledningstillfälle

#### v2:

- Meny godkänd
- Fortsätt att implementera funktionalitet
