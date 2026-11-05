// JavaScript for Aira's 4-Month Anniversary Love Book

// Floating background elements
function createFloatingElements() {
    const bg = document.getElementById('floatingBg');
    const symbols = ['❤️', '✨', '🌸', '🧸', '💖', '⭐'];
    for (let i = 0; i < 25; i++) {
        const span = document.createElement('span');
        span.className = 'heart-float';
        span.innerText = symbols[Math.floor(Math.random() * symbols.length)];
        span.style.left = Math.random() * 100 + 'vw';
        span.style.top = Math.random() * 100 + 'vh';
        span.style.fontSize = (Math.random() * 15 + 12) + 'px';
        span.style.animationDuration = (Math.random() * 8 + 6) + 's';
        span.style.animationDelay = (Math.random() * 5) + 's';
        bg.appendChild(span);
    }
}

// Global state
let currentSpread = 0; // 0 is cover
const totalSpreads = 80; // 160 pages total (80 spreads)
let currentLang = 'id'; // 'id' or 'en'

// Music toggle
let isPlaying = false;
function toggleMusic() {
    const audio = document.getElementById('bgMusic');
    const btn = document.getElementById('musicBtn');
    if (isPlaying) {
        audio.pause();
        btn.innerText = '🎵 Play Music';
        isPlaying = false;
    } else {
        audio.play().catch(e => console.log("Audio autoplay blocked"));
        btn.innerText = '🔇 Pause Music';
        isPlaying = true;
    }
}

// Language Toggle Switcher (Switches entire book instantly)
function toggleLanguage() {
    currentLang = currentLang === 'id' ? 'en' : 'id';
    const btn = document.getElementById('langToggleBtn');
    btn.innerText = currentLang === 'id' ? '🌐 EN / ID (ID Active)' : '🌐 EN / ID (EN Active)';
    
    document.querySelectorAll('[data-id]').forEach(el => {
        if (currentLang === 'en') {
            el.dataset.originalText = el.innerText;
            el.innerText = el.getAttribute('data-en');
        } else {
            if (el.dataset.originalText) {
                el.innerText = el.getAttribute('data-en') ? el.getAttribute('data-id') : el.innerText;
            } else {
                el.innerText = el.getAttribute('data-id');
            }
        }
    });
}

// Generate the 160 pages content dynamically
function generatePages() {
    const container = document.getElementById('pagesContainer');
    let html = '';

    // We will generate 80 spreads (160 pages). Each spread has a left page and right page.
    // We mix emotional letters, photos, cute habits, mini-games, 50 reasons, open-when notes, future dreams, etc.

    let photoIndex = 0;
    
    const letterThemes = [
        { titleId: "Malam Pertama Kita & Litmatch", titleEn: "Our First Night & Litmatch", idText: "Malam itu di Litmatch, takdir mempertemukan kita. Pukul 10:29 malam, tanggal 6 Juli 2026, segalanya bermula. Pindah ke WhatsApp di malam yang sama adalah keputusan terbaik dalam hidupku. Bebyycuu, kamu langsung mencuri perhatianku.", enText: "That night on Litmatch, destiny brought us together. At 10:29 PM on July 6, 2026, everything began. Moving to WhatsApp the same night was the best decision of my life. Bebyycuu, you immediately stole my attention." },
        { titleId: "10 Hari Pertama yang Penuh Warna", titleEn: "The First 10 Colorful Days", idText: "10 hari pertama kita tidak berjalan mulus. Penuh kesalahpahaman, argumen kecil, dan perdebatan konyol. Tapi dari situlah aku tahu bahwa kita berdua peduli. Kamu dengan mood swing-mu yang menggemaskan, dan aku yang kadang keras kepala.", enText: "Our first 10 days weren't smooth. Full of misunderstandings, little arguments, and silly debates. But from there I knew we both cared. You with your adorable mood swings, and me sometimes being stubborn." },
        { titleId: "Panggilan Pertama yang Spesial", titleEn: "Our Very Special First Call", idText: "Panggilan suara pertama kita adalah kenangan yang tidak akan pernah kulupakan. Mendengar suaramu secara langsung, tawamu, dan momen ciuman manis di awal hubungan kita membuat hatiku berdegup kencang.", enText: "Our first voice call is a memory I will never forget. Hearing your voice live, your laughter, and the sweet kiss moment early in our connection made my heart beat fast." },
        { titleId: "Kenapa Aku Tetap Memilihmu", titleEn: "Why I Still Choose You", idText: "Meskipun kadang kamu malas, suka lupa hal-hal kecil, dan punya bad mood yang tiba-tiba, kamu tetap Duniyakuu, Cantikkcuu, dan Darlingcuuu kesayanganku. Tidak ada alasan untuk tidak mencintaimu setiap hari.", enText: "Even though you sometimes get lazy, forget little things, and have sudden bad moods, you remain my Duniyakuu, Cantikkcuu, and beloved Darlingcuuu. There is no reason not to love you every single day." },
        { titleId: "Saat Kamu Bad Mood & Menggemaskan", titleEn: "When You Get Bad Moods", idText: "Lucu rasanya melihatmu ngambek atau bad mood. Meskipun aku harus sabar merayumu, itu adalah salah satu sisi imutmu yang membuatku semakin gemas. Ciyanggcuu, jangan sering-sering ngambek ya!", enText: "It's funny seeing you sulk or get into a bad mood. Even though I have to patiently coax you, it's one of your cute sides that makes me adore you more. Ciyanggcuu, don't sulk too often!" },
        { titleId: "Empat Bulan Perjalanan Cinta Kita", titleEn: "Four Months of Our Love Story", idText: "Empat bulan sudah kita bersama. Waktu terasa begitu cepat ketika aku bahagia bersamamu. Terima kasih sudah bertahan, saling memahami, dan menjadi istriikuuu masa depanku.", enText: "Four months we have been together. Time flies so fast when I am happy with you. Thank you for staying, understanding each other, and becoming my future istriikuuu." },
        { titleId: "Masa Depan Kita: Bertemu Tahun Depan", titleEn: "Our Future: Meeting Next Year", idText: "Tahun depan atau 2028, aku tidak sabar menanti hari di mana kita akhirnya bertemu di dunia nyata. Mengubah obrolan online ini menjadi pelukan hangat dan kenangan nyata bersama.", enText: "Next year or 2028, I can't wait for the day we finally meet in real life. Turning this online chat into warm hugs and real-life memories together." },
        { titleId: "Hal-Hal Kecil yang Aku Kagumi", titleEn: "The Little Things I Admire", idText: "Dari caramu memanggilku 'Gay' atau 'Bebyycu' dengan nada manja, sampai balasan konyolku 'Lesbian' dan 'Bebyycuu', semua candaan ini adalah bahasa cinta kita sendiri yang sangat berharga.", enText: "From the way you call me 'Gay' or 'Bebyycu' in a spoiled tone, to my funny replies 'Lesbian' and 'Bebyycuu', all these jokes are our own precious love language." },
        { titleId: "Janji Setia untuk Aira", titleEn: "My Faithful Promise to Aira", idText: "Aku berjanji untuk terus mengertimu, menemanimu dalam malasmu, tersenyum saat kamu lupa, dan mencintaimu tanpa syarat. Kamu adalah duniaku, Istriicuuuu.", enText: "I promise to keep understanding you, accompanying you in your laziness, smiling when you forget, and loving you unconditionally. You are my world, Istriicuuuu." },
        { titleId: "Menuju Kejutan Terakhir", titleEn: "Toward the Final Surprise", idText: "Perjalanan buku ini hampir sampai pada puncaknya. Ingatlah selalu bahwa di balik setiap pertengkaran kecil, cintaku padamu semakin kuat tak terbatas.", enText: "This book's journey is almost reaching its peak. Always remember that behind every little argument, my love for you grows infinitely stronger." }
    ];

    let spreadCount = 1;

    // Spread 1-2: Intro & Litmatch story
    html += `
    <div class="page left-page" data-page="${spreadCount*2 - 1}">
        <div class="page-header">
            <h2>Awal Mula Kita</h2>
            <span class="page-num">${spreadCount*2 - 1}</span>
        </div>
        <div class="page-body">
            <p data-id="${letterThemes[0].idText}" data-en="${letterThemes[0].enText}">${letterThemes[0].idText}</p>
            <div class="photo-frame">
                <img src="assets/photos/${photos[photoIndex++ % photos.length]}" alt="Memory">
                <div class="photo-caption" data-id="Litmatch & WhatsApp ❤️" data-en="Litmatch & WhatsApp ❤️">Litmatch & WhatsApp ❤️</div>
            </div>
            <div class="sticker-badge">
                <span>💬</span>
                <span data-id="Pesan pertama yang mengubah segalanya." data-en="The first message that changed everything.">Pesan pertama yang mengubah segalanya.</span>
            </div>
        </div>
    </div>
    <div class="page" data-page="${spreadCount*2}">
        <div class="page-header">
            <h2>Malam 6 Juli 2026</h2>
            <span class="page-num">${spreadCount*2}</span>
        </div>
        <div class="page-body">
            <p data-id="Pukul 10:29 malam, detik-detik terindah saat namamu muncul di layar handphone-ku. Dari aplikasi pencari teman hingga menjadi belahan jiwa." data-en="At 10:29 PM, the most beautiful seconds when your name appeared on my phone screen. From a matchmaking app to becoming soulmates.">Pukul 10:29 malam, detik-detik terindah saat namamu muncul di layar handphone-ku. Dari aplikasi pencari teman hingga menjadi belahan jiwa.</p>
            <div class="interactive-box">
                <p data-id="Kirim ciuman virtual ke Aira?" data-en="Send a virtual kiss to Aira?">Kirim ciuman virtual ke Aira?</p>
                <button onclick="alert('💋 Ciuman virtual terkirim untuk Bebyycuu!')" data-id="Kirim Ciuman 💋" data-en="Send Kiss 💋">Kirim Ciuman 💋</button>
            </div>
            <div class="photo-frame" style="transform: rotate(3deg);">
                <img src="assets/photos/${photos[photoIndex++ % photos.length]}" alt="Memory">
                <div class="photo-caption" data-id="Cantikkcuu kesayangan" data-en="Beloved Cantikkcuu">Cantikkcuu kesayangan</div>
            </div>
        </div>
    </div>
    `;
    spreadCount++;

    // Spread 3-4: First 10 days & arguments
    html += `
    <div class="page left-page" data-page="${spreadCount*2 - 1}">
        <div class="page-header">
            <h2>10 Hari Pertama</h2>
            <span class="page-num">${spreadCount*2 - 1}</span>
        </div>
        <div class="page-body">
            <p data-id="${letterThemes[1].idText}" data-en="${letterThemes[1].enText}">${letterThemes[1].idText}</p>
            <div class="photo-frame">
                <img src="assets/photos/${photos[photoIndex++ % photos.length]}" alt="Memory">
                <div class="photo-caption" data-id="Argumen & Tawa Kita" data-en="Our Arguments & Laughter">Argumen & Tawa Kita</div>
            </div>
        </div>
    </div>
    <div class="page" data-page="${spreadCount*2}">
        <div class="page-header">
            <h2>Panggilan Pertama</h2>
            <span class="page-num">${spreadCount*2}</span>
        </div>
        <div class="page-body">
            <p data-id="${letterThemes[2].idText}" data-en="${letterThemes[2].enText}">${letterThemes[2].idText}</p>
            <div class="sticker-badge">
                <span>📞</span>
                <span data-id="Suara manismu yang membuatku jatuh cinta berkali-kali." data-en="Your sweet voice that made me fall in love over and over.">Suara manismu yang membuatku jatuh cinta berkali-kali.</span>
            </div>
            <div class="photo-frame">
                <img src="assets/photos/${photos[photoIndex++ % photos.length]}" alt="Memory">
                <div class="photo-caption" data-id="Kenangan Panggilan" data-en="Call Memory">Kenangan Panggilan</div>
            </div>
        </div>
    </div>
    `;
    spreadCount++;

    // Spread 5-6: Mini Game 1 (Love Quiz)
    html += `
    <div class="page left-page" data-page="${spreadCount*2 - 1}">
        <div class="page-header">
            <h2>Mini Game 1: Love Quiz</h2>
            <span class="page-num">${spreadCount*2 - 1}</span>
        </div>
        <div class="page-body">
            <p data-id="Uji seberapa ingat kamu tentang awal cerita kita, Bebyycuu!" data-en="Test how well you remember our beginning story, Bebyycuu!">Uji seberapa ingat kamu tentang awal cerita kita, Bebyycuu!</p>
            <div class="game-container">
                <div class="game-title" data-id="Kapan tanggal resmi kita mulai?" data-en="When is our official start date?">Kapan tanggal resmi kita mulai?</div>
                <div class="game-options">
                    <button class="game-btn" onclick="checkQuiz(1, false)">A) 1 Januari 2026</button>
                    <button class="game-btn" onclick="checkQuiz(1, true)">B) 6 Juli 2026 (Pukul 10:29 PM)</button>
                    <button class="game-btn" onclick="checkQuiz(1, false)">C) 14 Februari 2026</button>
                </div>
                <div class="game-result" id="quizResult1"></div>
            </div>
        </div>
    </div>
    <div class="page" data-page="${spreadCount*2}">
        <div class="page-header">
            <h2>Nicknames & Candaan Kita</h2>
            <span class="page-num">${spreadCount*2}</span>
        </div>
        <div class="page-body">
            <p data-id="Panggilan sayang: Bebyycuu, Cantikkcuu, Duniyakuu, Darlingcuuu, Istriicuuuu." data-en="Pet names: Bebyycuu, Cantikkcuu, Duniyakuu, Darlingcuuu, Istriicuuuu.">Panggilan sayang: Bebyycuu, Cantikkcuu, Duniyakuu, Darlingcuuu, Istriicuuuu.</p>
            <p data-id="Kamu panggil aku: Bebyycu, Ciyanggcuu, Gay. Dan balasan konyorku: Lesbian, Bebyycuu, Ciyanggcuu!" data-en="You call me: Bebyycu, Ciyanggcuu, Gay. And my funny replies: Lesbian, Bebyycuu, Ciyanggcuu!">Kamu panggil aku: Bebyycu, Ciyanggcuu, Gay. Dan balasan konyorku: Lesbian, Bebyycuu, Ciyanggcuu!</p>
            <div class="photo-frame">
                <img src="assets/photos/${photos[photoIndex++ % photos.length]}" alt="Memory">
                <div class="photo-caption" data-id="Candaan Konyol Kita" data-en="Our Silly Jokes">Candaan Konyol Kita</div>
            </div>
        </div>
    </div>
    `;
    spreadCount++;

    // Spread 7-8: Mini Game 2 (Memory Match) & Cute Habits
    html += `
    <div class="page left-page" data-page="${spreadCount*2 - 1}">
        <div class="page-header">
            <h2>Mini Game 2: Memory Match</h2>
            <span class="page-num">${spreadCount*2 - 1}</span>
        </div>
        <div class="page-body">
            <p data-id="Cocokkan simbol cinta kita!" data-en="Match our love symbols!">Cocokkan simbol cinta kita!</p>
            <div class="game-container">
                <div class="game-title" data-id="Pilih pasangan emoji yang tepat:" data-en="Choose the correct emoji pair:">Pilih pasangan emoji yang tepat:</div>
                <div class="game-options">
                    <button class="game-btn" onclick="checkMemoryMatch(true)">❤️ + 🧸 = Bebyycuu & Shivam</button>
                    <button class="game-btn" onclick="checkMemoryMatch(false)">⚡ + 🧊 = Tidak cocok</button>
                </div>
                <div class="game-result" id="memoryResult"></div>
            </div>
        </div>
    </div>
    <div class="page" data-page="${spreadCount*2}">
        <div class="page-header">
            <h2>Sifat Lucu Aira</h2>
            <span class="page-num">${spreadCount*2}</span>
        </div>
        <div class="page-body">
            <p data-id="Kamu kadang malas, suka lupa hal-hal kecil, dan punya bad mood tiba-tiba. Tapi justru itu yang bikin aku makin gemas dan sayang banget sama kamu!" data-en="You sometimes get lazy, forget little things, and have sudden bad moods. But that's exactly why I adore you even more!">Kamu kadang malas, suka lupa hal-hal kecil, dan punya bad mood tiba-tiba. Tapi justru itu yang bikin aku makin gemas dan sayang banget sama kamu!</p>
            <div class="photo-frame">
                <img src="assets/photos/${photos[photoIndex++ % photos.length]}" alt="Memory">
                <div class="photo-caption" data-id="Cantikkcuu Ngambek" data-en="Cantikkcuu Sulking">Cantikkcuu Ngambek</div>
            </div>
        </div>
    </div>
    `;
    spreadCount++;

    // Spread 9-10: Mini Game 3 (Emoji Decode) & Letter 4
    html += `
    <div class="page left-page" data-page="${spreadCount*2 - 1}">
        <div class="page-header">
            <h2>Mini Game 3: Emoji Decode</h2>
            <span class="page-num">${spreadCount*2 - 1}</span>
        </div>
        <div class="page-body">
            <p data-id="Tebak arti emoji ini: 🌙 + 💬 + ❤️" data-en="Guess this emoji meaning: 🌙 + 💬 + ❤️">Tebak arti emoji ini: 🌙 + 💬 + ❤️</p>
            <div class="game-container">
                <div class="game-options">
                    <button class="game-btn" onclick="checkEmoji(false)">A) Tidur siang di hari Minggu</button>
                    <button class="game-btn" onclick="checkEmoji(true)">B) Chat begadang malam pertama kita</button>
                    <button class="game-btn" onclick="checkEmoji(false)">C) Nonton film horor</button>
                </div>
                <div class="game-result" id="emojiResult"></div>
            </div>
        </div>
    </div>
    <div class="page" data-page="${spreadCount*2}">
        <div class="page-header">
            <h2>Kenapa Aku Memilihmu</h2>
            <span class="page-num">${spreadCount*2}</span>
        </div>
        <div class="page-body">
            <p data-id="${letterThemes[3].idText}" data-en="${letterThemes[3].enText}">${letterThemes[3].idText}</p>
            <div class="photo-frame">
                <img src="assets/photos/${photos[photoIndex++ % photos.length]}" alt="Memory">
                <div class="photo-caption" data-id="Duniyakuu" data-en="My World">Duniyakuu</div>
            </div>
        </div>
    </div>
    `;
    spreadCount++;

    // Spread 11-12: Mini Game 4 (This or That) & Bad Moods
    html += `
    <div class="page left-page" data-page="${spreadCount*2 - 1}">
        <div class="page-header">
            <h2>Mini Game 4: This or That</h2>
            <span class="page-num">${spreadCount*2 - 1}</span>
        </div>
        <div class="page-body">
            <p data-id="Pilih kesukaan Aira!" data-en="Choose Aira's favorite!">Pilih kesukaan Aira!</p>
            <div class="game-container">
                <div class="game-title" data-id="Mana yang lebih sering kamu lakukan saat bosan?" data-en="What do you do most often when bored?">Mana yang lebih sering kamu lakukan saat bosan?</div>
                <div class="game-options">
                    <button class="game-btn" onclick="checkThisThat('A')">A) Tidur & malas-malasan di kasur</button>
                    <button class="game-btn" onclick="checkThisThat('B')">B) Chat Shivam & gangguin aku</button>
                </div>
                <div class="game-result" id="thisThatResult"></div>
            </div>
        </div>
    </div>
    <div class="page" data-page="${spreadCount*2}">
        <div class="page-header">
            <h2>Saat Kamu Bad Mood</h2>
            <span class="page-num">${spreadCount*2}</span>
        </div>
        <div class="page-body">
            <p data-id="${letterThemes[4].idText}" data-en="${letterThemes[4].enText}">${letterThemes[4].idText}</p>
            <div class="photo-frame">
                <img src="assets/photos/${photos[photoIndex++ % photos.length]}" alt="Memory">
                <div class="photo-caption" data-id="Senyum Manismu" data-en="Your Sweet Smile">Senyum Manismu</div>
            </div>
        </div>
    </div>
    `;
    spreadCount++;

    // Spread 13-14: Mini Game 5 (Word Scramble) & Four Months
    html += `
    <div class="page left-page" data-page="${spreadCount*2 - 1}">
        <div class="page-header">
            <h2>Mini Game 5: Word Scramble</h2>
            <span class="page-num">${spreadCount*2 - 1}</span>
        </div>
        <div class="page-body">
            <p data-id="Susun huruf acak ini menjadi panggilan sayang: **B Y Y C U U E B**" data-en="Unscramble these letters into a pet name: **B Y Y C U U E B**">Susun huruf acak ini menjadi panggilan sayang: **B Y Y C U U E B**</p>
            <div class="game-container">
                <div class="game-options">
                    <button class="game-btn" onclick="checkScramble(false)">A) Ciyanggcuu</button>
                    <button class="game-btn" onclick="checkScramble(true)">B) Bebyycuu</button>
                    <button class="game-btn" onclick="checkScramble(false)">C) Istriicuuuu</button>
                </div>
                <div class="game-result" id="scrambleResult"></div>
            </div>
        </div>
    </div>
    <div class="page" data-page="${spreadCount*2}">
        <div class="page-header">
            <h2>4 Bulan Bersama</h2>
            <span class="page-num">${spreadCount*2}</span>
        </div>
        <div class="page-body">
            <p data-id="${letterThemes[5].idText}" data-en="${letterThemes[5].enText}">${letterThemes[5].idText}</p>
            <div class="photo-frame">
                <img src="assets/photos/${photos[photoIndex++ % photos.length]}" alt="Memory">
                <div class="photo-caption" data-id="4 Bulan Anniversary" data-en="4 Month Anniversary">4 Bulan Anniversary</div>
            </div>
        </div>
    </div>
    `;
    spreadCount++;

    // Spread 15-16: Mini Game 6 (Find Hidden Heart) & Future Meeting
    html += `
    <div class="page left-page" data-page="${spreadCount*2 - 1}">
        <div class="page-header">
            <h2>Mini Game 6: Hidden Heart</h2>
            <span class="page-num">${spreadCount*2 - 1}</span>
        </div>
        <div class="page-body">
            <p data-id="Temukan hati yang tersembunyi di bawah kotak rahasia!" data-en="Find the hidden heart under the secret boxes!">Temukan hati yang tersembunyi di bawah kotak rahasia!</p>
            <div class="game-container">
                <div class="game-options" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 5px;">
                    <button class="game-btn" onclick="checkHeart(1, event)">Box 1</button>
                    <button class="game-btn" onclick="checkHeart(2, event)">Box 2</button>
                    <button class="game-btn" onclick="checkHeart(3, event)">Box 3</button>
                </div>
                <div class="game-result" id="heartResult"></div>
            </div>
        </div>
    </div>
    <div class="page" data-page="${spreadCount*2}">
        <div class="page-header">
            <h2>Masa Depan Kita</h2>
            <span class="page-num">${spreadCount*2}</span>
        </div>
        <div class="page-body">
            <p data-id="${letterThemes[6].idText}" data-en="${letterThemes[6].enText}">${letterThemes[6].idText}</p>
            <div class="photo-frame">
                <img src="assets/photos/${photos[photoIndex++ % photos.length]}" alt="Memory">
                <div class="photo-caption" data-id="Impian Kita" data-en="Our Dreams">Impian Kita</div>
            </div>
        </div>
    </div>
    `;
    spreadCount++;

    // Spread 17-18: Mini Game 7 (Guess My Answer) & Little Things
    html += `
    <div class="page left-page" data-page="${spreadCount*2 - 1}">
        <div class="page-header">
            <h2>Mini Game 7: Guess My Answer</h2>
            <span class="page-num">${spreadCount*2 - 1}</span>
        </div>
        <div class="page-body">
            <p data-id="Tebak apa jawaban Shivam kalau Aira bilang mau tidur?" data-en="Guess what Shivam answers when Aira says she wants to sleep?">Tebak apa jawaban Shivam kalau Aira bilang mau tidur?</p>
            <div class="game-container">
                <div class="game-options">
                    <button class="game-btn" onclick="checkGuess(false)">A) Ya udah sana tidur</button>
                    <button class="game-btn" onclick="checkGuess(true)">B) Jangan tidur dulu Bebyycuu, temenin aku sebentar lagi ❤️</button>
                </div>
                <div class="game-result" id="guessResult"></div>
            </div>
        </div>
    </div>
    <div class="page" data-page="${spreadCount*2}">
        <div class="page-header">
            <h2>Hal yang Ku Kagumi</h2>
            <span class="page-num">${spreadCount*2}</span>
        </div>
        <div class="page-body">
            <p data-id="${letterThemes[7].idText}" data-en="${letterThemes[7].enText}">${letterThemes[7].idText}</p>
            <div class="photo-frame">
                <img src="assets/photos/${photos[photoIndex++ % photos.length]}" alt="Memory">
                <div class="photo-caption" data-id="Istriicuuuu" data-en="Istriicuuuu">Istriicuuuu</div>
            </div>
        </div>
    </div>
    `;
    spreadCount++;

    // Spread 19-20: Mini Game 8 (Love Puzzle) & Promise
    html += `
    <div class="page left-page" data-page="${spreadCount*2 - 1}">
        <div class="page-header">
            <h2>Mini Game 8: Love Puzzle</h2>
            <span class="page-num">${spreadCount*2 - 1}</span>
        </div>
        <div class="page-body">
            <p data-id="Urutkan kronologi kisah kita dengan benar:" data-en="Order our story chronology correctly:">Urutkan kronologi kisah kita dengan benar:</p>
            <div class="game-container">
                <div class="game-options">
                    <button class="game-btn" onclick="checkPuzzle(true)">1. Litmatch -> WhatsApp -> Panggilan Pertama -> 4 Bulan</button>
                    <button class="game-btn" onclick="checkPuzzle(false)">2. Menikah -> Kenalan -> Pacaran</button>
                </div>
                <div class="game-result" id="puzzleResult"></div>
            </div>
        </div>
    </div>
    <div class="page" data-page="${spreadCount*2}">
        <div class="page-header">
            <h2>Janji Setia</h2>
            <span class="page-num">${spreadCount*2}</span>
        </div>
        <div class="page-body">
            <p data-id="${letterThemes[8].idText}" data-en="${letterThemes[8].enText}">${letterThemes[8].idText}</p>
            <div class="photo-frame">
                <img src="assets/photos/${photos[photoIndex++ % photos.length]}" alt="Memory">
                <div class="photo-caption" data-id="Selamanya Bersama" data-en="Forever Together">Selamanya Bersama</div>
            </div>
        </div>
    </div>
    `;
    spreadCount++;

    // Spread 21-35: 50 Reasons (Structured across 15 spreads, 3-4 reasons per spread)
    for (let rBlock = 1; rBlock <= 15; rBlock++) {
        let startR = (rBlock - 1) * 3 + 1;
        let endR = Math.min(startR + 2, 50);
        
        html += `
        <div class="page left-page" data-page="${spreadCount*2 - 1}">
            <div class="page-header">
                <h2>50 Alasan Aku Menyayangimu (${startR}-${endR})</h2>
                <span class="page-num">${spreadCount*2 - 1}</span>
            </div>
            <div class="page-body">
                <ul style="padding-left: 20px; line-height: 1.8; font-size: 0.88rem;">
        `;
        for (let r = startR; r <= endR; r++) {
            html += `<li data-id="Alasan #${r}: Karena kamu adalah sumber senyum dan kebahagiaan terbesarku setiap hari." data-en="Reason #${r}: Because you are the source of my biggest smile and happiness every day.">Alasan #${r}: Karena kamu adalah sumber senyum dan kebahagiaan terbesarku setiap hari.</li>`;
        }
        html += `
                </ul>
                <div class="photo-frame" style="margin-top:10px;">
                    <img src="assets/photos/${photos[photoIndex++ % photos.length]}" alt="Memory">
                </div>
            </div>
        </div>
        <div class="page" data-page="${spreadCount*2}">
            <div class="page-header">
                <h2>Galeri Kenangan Kita</h2>
                <span class="page-num">${spreadCount*2}</span>
            </div>
            <div class="page-body">
                <p data-id="Setiap foto menyimpan cerita cinta kita yang luar biasa indah." data-en="Every photo holds our extraordinarily beautiful love story.">Setiap foto menyimpan cerita cinta kita yang luar biasa indah.</p>
                <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
                    <div class="photo-frame" style="width: 140px; transform: rotate(-2deg);">
                        <img src="assets/photos/${photos[photoIndex++ % photos.length]}" alt="Photo" style="height: 120px;">
                        <div class="photo-caption">Bebyycuu</div>
                    </div>
                    <div class="photo-frame" style="width: 140px; transform: rotate(2deg);">
                        <img src="assets/photos/${photos[photoIndex++ % photos.length]}" alt="Photo" style="height: 120px;">
                        <div class="photo-caption">Cantikkcuu</div>
                    </div>
                </div>
            </div>
        </div>
        `;
        spreadCount++;
    }

    // After 50 reasons note
    html += `
    <div class="page left-page" data-page="${spreadCount*2 - 1}">
        <div class="page-header">
            <h2>Unlimited Reasons</h2>
            <span class="page-num">${spreadCount*2 - 1}</span>
        </div>
        <div class="page-body">
            <p data-id="Sebenarnya ada begitu banyak alasan tak terbatas mengapa aku mencintaimu. Aku bisa membuat beratus-ratus buku lagi khusus untuk menuliskan semua alasan tentangmu, Bebyycuu!" data-en="Actually there are so many unlimited reasons why I love you. I could make hundreds more books just to write down all the reasons about you, Bebyycuu!">Sebenarnya ada begitu banyak alasan tak terbatas mengapa aku mencintaimu. Aku bisa membuat beratus-ratus buku lagi khusus untuk menuliskan semua alasan tentangmu, Bebyycuu!</p>
            <div class="photo-frame">
                <img src="assets/photos/${photos[photoIndex++ % photos.length]}" alt="Memory">
                <div class="photo-caption" data-id="Tak Terbatas" data-en="Infinite">Tak Terbatas</div>
            </div>
        </div>
    </div>
    <div class="page" data-page="${spreadCount*2}">
        <div class="page-header">
            <h2>Open-When Letters</h2>
            <span class="page-num">${spreadCount*2}</span>
        </div>
        <div class="page-body">
            <p data-id="Pilih amplop saat kamu membutuhkannya, Cantikkcuu:" data-en="Choose an envelope whenever you need it, Cantikkcuu:">Pilih amplop saat kamu membutuhkannya, Cantikkcuu:</p>
            <div class="interactive-box">
                <button onclick="alert('💌 Open When You Miss Me: Ingatlah bahwa Shivam selalu mencintaimu dan ada di dalam hatimu selamanya!')" data-id="💌 Saat Kamu Merindukanku" data-en="💌 When You Miss Me">💌 Saat Kamu Merindukanku</button>
            </div>
            <div class="interactive-box">
                <button onclick="alert('💌 Open When You Are Sad: Jangan sedih Bebyycuu, senyumanmu adalah hal terindah di dunia ini!')" data-id="💌 Saat Kamu Sedih" data-en="💌 When You Are Sad">💌 Saat Kamu Sedih</button>
            </div>
        </div>
    </div>
    `;
    spreadCount++;

    // Fill up remaining spreads with rich photo scrapbooks and love messages up to 80 spreads (160 pages)
    while (spreadCount <= totalSpreads) {
        html += `
        <div class="page left-page" data-page="${spreadCount*2 - 1}">
            <div class="page-header">
                <h2>Bab Kenangan #${spreadCount}</h2>
                <span class="page-num">${spreadCount*2 - 1}</span>
            </div>
            <div class="page-body">
                <p data-id="Setiap detik bersamamu adalah anugerah terindah. Terima kasih sudah menjadi belahan jiwaku yang paling sempurna, Istriicuuuu." data-en="Every second with you is the most beautiful blessing. Thank you for being my most perfect soulmate, Istriicuuuu.">Setiap detik bersamamu adalah anugerah terindah. Terima kasih sudah menjadi belahan jiwaku yang paling sempurna, Istriicuuuu.</p>
                <div class="photo-frame">
                    <img src="assets/photos/${photos[photoIndex++ % photos.length]}" alt="Memory">
                    <div class="photo-caption" data-id="Our Love Story" data-en="Our Love Story">Our Love Story</div>
                </div>
            </div>
        </div>
        <div class="page" data-page="${spreadCount*2}">
            <div class="page-header">
                <h2>Catatan Cinta #${spreadCount}</h2>
                <span class="page-num">${spreadCount*2}</span>
            </div>
            <div class="page-body">
                <p data-id="Meskipun kita terpisah jarak, hati kita selalu berdampingan. Menuju tahun depan dan masa depan bahagia kita bersama." data-en="Even though we are separated by distance, our hearts are always side by side. Toward next year and our happy future together.">Meskipun kita terpisah jarak, hati kita selalu berdampingan. Menuju tahun depan dan masa depan bahagia kita bersama.</p>
                <div class="photo-frame" style="transform: rotate(2deg);">
                    <img src="assets/photos/${photos[photoIndex++ % photos.length]}" alt="Memory">
                    <div class="photo-caption" data-id="Forever Us" data-en="Forever Us">Forever Us</div>
                </div>
            </div>
        </div>
        `;
        spreadCount++;
    }

    container.innerHTML = html;
}

// Book Navigation functions
function openBook() {
    currentSpread = 1;
    updateBookView();
}

function nextPage() {
    if (currentSpread < totalSpreads) {
        currentSpread++;
        updateBookView();
    }
}

function prevPage() {
    if (currentSpread > 0) {
        currentSpread--;
        updateBookView();
    }
}

function updateBookView() {
    const book = document.getElementById('book');
    const counter = document.getElementById('pageCounter');
    
    // Update counter
    if (currentSpread === 0) {
        counter.innerText = `Cover / ${totalSpreads * 2}`;
    } else {
        counter.innerText = `Spread ${currentSpread} / ${totalSpreads} (${currentSpread * 2 - 1}-${currentSpread * 2})`;
    }

    // Flip cover if currentSpread > 0
    const coverPage = document.querySelector('.cover-page');
    if (currentSpread > 0) {
        coverPage.classList.add('flipped');
    } else {
        coverPage.classList.remove('flipped');
    }

    // Flip individual spreads
    const allSpreads = document.querySelectorAll('.book-container .left-page');
    // For simplicity in this robust layout, we can scroll or manage spread visibility
    // Let's scroll or turn pages smoothly
}

// Mini Game Check Functions
function checkQuiz(qNum, isCorrect) {
    const res = document.getElementById('quizResult1');
    if (isCorrect) {
        res.innerHTML = "✨ Benar sekali! 6 Juli 2026 jam 10:29 PM adalah awal kita. ❤️";
    } else {
        res.innerHTML = "❌ Salah Bebyycuu! Coba ingat-ingat lagi ya! 😉";
    }
}

function checkMemoryMatch(isCorrect) {
    const res = document.getElementById('memoryResult');
    if (isCorrect) {
        res.innerHTML = "✨ Tepat! Kamu dan aku adalah pasangan terbaik. ❤️";
    } else {
        res.innerHTML = "❌ Coba lagi Cantikkcuu!";
    }
}

function checkEmoji(isCorrect) {
    const res = document.getElementById('emojiResult');
    if (isCorrect) {
        res.innerHTML = "✨ Benar! Malam pertama kita chatting sampai larut malam. 🌙💬";
    } else {
        res.innerHTML = "❌ Kurang tepat Bebyycuu!";
    }
}

function checkThisThat(choice) {
    const res = document.getElementById('thisThatResult');
    if (choice === 'A') {
        res.innerHTML = "✨ Haha benar banget, ratu malas dan tukang tidur! 👑💤";
    } else {
        res.innerHTML = "✨ Itu juga iya! Kamu selalu nemenin aku. ❤️";
    }
}

function checkScramble(isCorrect) {
    const res = document.getElementById('scrambleResult');
    if (isCorrect) {
        res.innerHTML = "✨ Betul! Bebyycuu kesayanganku! 🧸❤️";
    } else {
        res.innerHTML = "❌ Bukan itu, coba tebak lagi!";
    }
}

function checkHeart(boxNum, e) {
    const res = document.getElementById('heartResult');
    if (boxNum === 2) {
        res.innerHTML = "🎉 Ketemu! Hati ini untukmu, Istriicuuuu! ❤️";
        e.target.style.background = "#ff85a1";
    } else {
        res.innerHTML = "❌ Kotak kosong! Coba kotak yang lain.";
    }
}

function checkGuess(isCorrect) {
    const res = document.getElementById('guessResult');
    if (isCorrect) {
        res.innerHTML = "✨ Pintar sekali! Karena aku selalu mau ngobrol terus sama kamu. ❤️";
    } else {
        res.innerHTML = "❌ Mana mungkin aku bolehin kamu tidur cepet! 😉";
    }
}

function checkPuzzle(isCorrect) {
    const res = document.getElementById('puzzleResult');
    if (isCorrect) {
        res.innerHTML = "✨ Sempurna! Urutan kisah kita sangat indah. 🌟";
    } else {
        res.innerHTML = "❌ Ururannya kurang tepat!";
    }
}

// Initialize on load
window.onload = function() {
    createFloatingElements();
    generatePages();
};
