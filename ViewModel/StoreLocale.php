<?php
/**
 * Copyright © Rob Aimes - https://aimes.dev
 * https://github.com/robaimes
 */

namespace Aimes\VoiceSearch\ViewModel;

use Magento\Framework\Locale\Resolver as LocaleResolver;
use Magento\Framework\View\Element\Block\ArgumentInterface;

class StoreLocale implements ArgumentInterface
{
    /** @var LocaleResolver */
    protected $localeResolver;

    /**
     * @param LocaleResolver $localeResolver
     */
    public function __construct(
        LocaleResolver $localeResolver
    ) {
        $this->localeResolver = $localeResolver;
    }

    /**
     * @return string
     */
    public function getConvertedLocaleCode(): string
    {
        return str_replace('_', '-', $this->getStoreLocale());
    }

    /**
     * @return string
     */
    public function getStoreLocale(): string
    {
        return $this->localeResolver->getLocale();
    }
}

