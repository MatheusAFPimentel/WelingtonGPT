function sendMessage() {
    var userInput = document.getElementById('user-input').value;
    if (!userInput.trim()) return;

    var chatWindow = document.getElementById('chat-window');
    chatWindow.innerHTML += '<p class="user-message"><strong>Você:</strong> ' + userInput + '</p>';
    scrollToBottom(chatWindow); // Rolamento automático para a nova mensagem

    // Simula uma resposta como se estivesse digitando
    var typingIndicator = document.querySelector('.typing-indicator');
    typingIndicator.style.display = 'block';

    setTimeout(function() {
        typingIndicator.style.display = 'none';
        scrollToBottom(chatWindow); // Rolamento automático para a nova mensagem simulada

        // Enviar a mensagem para a API e obter a resposta
        var requestBody = {
            "model": "gpt-3.5-turbo",
            "messages": [{"role": "user", "content": userInput}]
        };

        fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer APY TOKEN',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })
        .then(response => response.json())
        .then(data => {
            var message = data.choices[0].message.content;
            chatWindow.innerHTML += '<p class="bot-message"><strong>Welington GPT</strong> ' + message + '</p>';
            scrollToBottom(chatWindow); // Rolamento automático para a resposta do bot
            document.getElementById('user-input').value = ''; // Limpa o conteúdo do textarea
        })
        .catch(error => console.error('Erro:', error));
    }, 100); // Simula um atraso de 2 segundos para a resposta do bot
}

function scrollToBottom(element) {
    element.scrollTop = element.scrollHeight;
}

document.addEventListener('DOMContentLoaded', function() {
    var userInput = document.getElementById('user-input');
    
    userInput.addEventListener('keypress', function(event) {
        // Verifica se a tecla pressionada é "Enter"
        if (event.key === 'Enter' && !event.shiftKey) {
            // Impede que o caractere de nova linha seja adicionado ao textarea
            event.preventDefault();
            // Envia a mensagem
            sendMessage();
        }
    });
});
