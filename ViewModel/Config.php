<?php
/**
 * Copyright © Rob Aimes - https://aimes.dev
 * https://github.com/robaimes
 */

namespace Aimes\VoiceSearch\ViewModel;

use Magento\Framework\App\Config\ScopeConfigInterface;
use Magento\Framework\View\Element\Block\ArgumentInterface;
use Magento\Store\Model\ScopeInterface;

class Config implements ArgumentInterface
{
    const XML_PATH_VOICE_SEARCH_ENABLED = 'catalog/search/enable_voice_search';
    const XML_PATH_SKIP_SUGGESTIONS = 'catalog/search/skip_suggestions';

    /** @var ScopeConfigInterface */
    protected $scopeConfig;

    /**
     * @param ScopeConfigInterface $scopeConfig
     */
    public function __construct(
        ScopeConfigInterface $scopeConfig
    ) {
        $this->scopeConfig = $scopeConfig;
    }

    /**
     * @return bool
     */
    public function isEnabled(): bool
    {
        return $this->scopeConfig->isSetFlag(
            self::XML_PATH_VOICE_SEARCH_ENABLED,
            ScopeInterface::SCOPE_STORE
        );
    }

    /**
     * @return bool
     */
    public function getSkipSuggestions(): bool
    {
        return $this->scopeConfig->isSetFlag(
            self::XML_PATH_SKIP_SUGGESTIONS,
            ScopeInterface::SCOPE_STORE
        );
    }
}

