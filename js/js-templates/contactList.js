function contactListHtml() {
    return `
    <button onclick="openAddContact()" class="btn-new-mobile btn-primary">
                <span>New contact</span>
                <img src="../src/img/new-contact.svg" alt="">
            </button>

            <div class="c-letter-div">
                <div class="c-initial-letter">A</div>
                <div class="c-initial-letter-border"></div>
            </div>

            <div id="c-0" class="c-contact-overview" onclick="highlightContact(0), showContactDetail()">
                <div id="c-i-0" class="c-initials c-i-small color-2">AM</div>
                <div class="contact-summery">
                    <p id="c-name-0" class="c-list-name">Anton Mayer</p>
                    <p class="c-list-mail">antom@gmail.com</p>
                </div>
            </div>
            <div class="c-contact-overview">
                <div class="c-initials c-i-small color-3">AS</div>
                <div class="contact-summery">
                    <p class="c-list-name">Anja Schulz</p>
                    <p class="c-list-mail">schulz@hotmail.com</p>
                </div>
            </div>

            <div class="c-letter-div">
                <div class="c-initial-letter">B</div>
                <div class="c-initial-letter-border"></div>
            </div>

            <div class="c-contact-overview">
                <div class="c-initials c-i-small color-4">BZ</div>
                <div class="contact-summery">
                    <p class="c-list-name">Benedikt Ziegler</p>
                    <p class="c-list-mail">benedikt@gmail.com</p>
                </div>
            </div>

            <div class="c-letter-div">
                <div class="c-initial-letter">D</div>
                <div class="c-initial-letter-border"></div>
            </div>

            <div class="c-contact-overview">
                <div class="c-initials c-i-small color-5">DE</div>
                <div class="contact-summery">
                    <p class="c-list-name">David Eisenberg</p>
                    <p class="c-list-mail">davidberg@gmail.com</p>
                </div>
            </div>

            <div class="c-letter-div">
                <div class="c-initial-letter">E</div>
                <div class="c-initial-letter-border"></div>
            </div>

            <div class="c-contact-overview">
                <div class="c-initials c-i-small color-6">EF</div>
                <div class="contact-summery">
                    <p class="c-list-name">Eva Fischer</p>
                    <p class="c-list-mail">eva@gmail.com</p>
                </div>
            </div>
            <div class="c-contact-overview">
                <div class="c-initials c-i-small color-7">EM</div>
                <div class="contact-summery">
                    <p class="c-list-name">Emmanuel Mauer</p>
                    <p class="c-list-mail">emmanuelMa@gmail.com</p>
                </div>
            </div>

            <div class="c-letter-div">
                <div class="c-initial-letter">M</div>
                <div class="c-initial-letter-border"></div>
            </div>

            <div class="c-contact-overview">
                <div class="c-initials c-i-small color-8">MW</div>
                <div class="contact-summery">
                    <p class="c-list-name">Marc Walter</p>
                    <p class="c-list-mail">m.walter-dev@gmx.de</p>
                </div>
            </div>
            <div class="c-contact-overview">
                <div class="c-initials c-i-small color-9">MB</div>
                <div class="contact-summery">
                    <p class="c-list-name">Marcel Bauer</p>
                    <p class="c-list-mail">bauer@gmail.com</p>
                </div>
            </div>

            <div id="c-view-mobile" class="c-view-mobile">

                <img onclick="goBackToContacts()" class="c-mobile-back" src="../src/img/ArrowBackDark.svg" alt="">

                <div class="c-view-head">
                    <h1>Contacts</h1>
                    <div class="c-v-line"></div>
                    <h2 class="c-h2">Better with a team</h2>
                </div>

                <div class="c-floating">
                    <div class="c-float-head">
                        <div class="c-initials c-i-big color-2">AM</div>
                        <div class="c-foad-h-right">
                            <div class="c-float-name">Anton Mayer</div>
                            <div>
                                <img src="../src/img/plus-icon-blue.svg" alt="" />
                                <a class="c-add-task" href="#">Add Task</a>
                            </div>
                        </div>
                    </div>

                    <div class="c-floating-middle">
                        <span class="c-float-info">Contact Information</span>
                        <div class="c-floating-edit">
                            <img src="../src/img/pencile-gray.svg" alt="" />
                            <span class="c-flat-edit-span">Edit Contact</span>
                        </div>
                    </div>

                    <div class="c-floating-detail">
                        <p class="c-floating-d-top">Email</p>
                        <p class="c-floating-d-bottom c-list-mail">antom@gmail.com</p>
                    </div>
                    <div class="c-floating-detail">
                        <p class="c-floating-d-top">Phone</p>
                        <p class="c-floating-d-bottom">+49 1111 111 11 1</p>
                    </div>
                </div>

                <button class="btn-new-contact btn-primary">
                    <span>New contact</span>
                    <img src="../src/img/new-contact.svg" alt="">
                </button>

            </div>
    `;
}